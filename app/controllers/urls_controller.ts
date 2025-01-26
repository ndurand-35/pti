import Campaign from '#models/campaign'
import Url from '#models/url'
import { createUrl } from '#validators/urls'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import xlsx from 'xlsx'
import { applyColumnFilter, applyGlobalFilter } from '../helpers/querySql.js'

export default class UrlsController {
  /**
   * Display a list of resource
   */
  async index({ request, view }: HttpContext) {
    const page = request.input('page', 1) // Numéro de page (par défaut 1)
    const limit = 10 // Nombre d'utilisateurs par page

    const urls = await Url.query().orderBy('created_at', 'desc').paginate(page, limit) // Récupère les campagnes triés par date de création

    const campaigns = await Campaign.query()
    return view.render('pages/admin/url/index', { urls, campaigns })
  }

  /**
   * Display form to create a new record
   */
  async create({ view, params }: HttpContext) {
    const campaignId = params.campaignId
    let campaign = null
    if (campaignId) {
      campaign = await Campaign.findOrFail(campaignId)
    }

    const campaigns = await Campaign.query()

    return view.render('pages/admin/url/create', { campaign, campaigns })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUrl)
    await Url.create(payload)

    if (payload.campaignId) {
      return response.redirect().toRoute('admin.campaigns.show', { id: payload.campaignId })
    }

    return response.redirect().toRoute('admin.urls.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const urlId = params.id
    const url = await Url.findOrFail(urlId)
    await url.delete()
  }

  async upload({ request, response, session }: HttpContext) {
    // Récupération du fichier Excel
    const file = request.file('excelFile', {
      extnames: ['xls', 'xlsx'],
      size: '2mb',
    })

    if (!file) {
      session.flash({ error: 'Aucun fichier sélectionné.' })
      return response.redirect().back()
    }

    if (!file.isValid) {
      session.flash({ error: 'Fichier invalide. Vérifiez l’extension ou la taille.' })
      return response.redirect().back()
    }

    // Sauvegarde du fichier dans un répertoire temporaire
    await file.move(app.tmpPath('uploads'))

    // Récupération de l'identifiant de la campagne
    const campaignId = request.input('campaignId')
    const campaign = await Campaign.find(campaignId)

    if (!campaign) {
      session.flash({ error: 'La campagne sélectionnée est invalide.' })
      return response.redirect().back()
    }

    try {
      // Charger le fichier Excel
      const workbook = xlsx.readFile(file.filePath!)
      const sheetName = workbook.SheetNames[0] // Utilise la première feuille
      const sheet = workbook.Sheets[sheetName]

      // Convertir les données de la feuille en JSON
      const data = xlsx.utils.sheet_to_json<{ URL?: string; Key?: string }>(sheet)

      // Vérifier si la colonne "URL" est présente
      if (data.length === 0 || !data[0].URL) {
        session.flash({ error: 'La colonne "URL" est manquante dans le fichier.' })
        return response.redirect().back()
      }

      // Liste pour stocker les URLs générées
      const updatedData = []

      for (const [_, row] of data.entries()) {
        if (!row.URL) continue

        // Enregistrement de l'URL dans la base de données
        const url = await Url.create({
          originalUrl: row.URL,
          matchingKey: row.Key ?? '',
          campaignId: campaign.id,
          clicksCount: 0, // Initialiser les clics à 0
          expiresAt: null, // Définir une date d'expiration si besoin
        })

        // Ajouter la ligne mise à jour dans la liste
        updatedData.push({
          ...row,
          shortUrl: url.shortUrl, // Nouvelle colonne avec l'URL générée
        })
      }

      // Convertir les données mises à jour en une nouvelle feuille Excel
      const updatedSheet = xlsx.utils.json_to_sheet(updatedData)
      const updatedWorkbook = xlsx.utils.book_new()
      xlsx.utils.book_append_sheet(updatedWorkbook, updatedSheet, sheetName)

      // Sauvegarder le fichier Excel modifié dans un répertoire temporaire
      const newFileName = `updated_${file.clientName}`
      const filePath = app.tmpPath(`uploads/${newFileName}`)
      xlsx.writeFile(updatedWorkbook, filePath)

      // Retourner le fichier Excel mis à jour en réponse
      response.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      response.header('Content-Disposition', `attachment; filename="${newFileName}"`)
      return response.download(filePath)
    } catch (error) {
      console.error(error)
      session.flash({ error: 'Une erreur est survenue lors du traitement du fichier.' })
      return response.redirect().back()
    }
  }

  async datatable({ request, response }: HttpContext) {
    const draw = request.input('draw') // Numéro de dessin (draw) pour DataTables
    const start = request.input('start') // Index de départ pour la pagination
    const length = request.input('length') // Nombre d'enregistrements par page
    const searchValue = request.input('search.value') // Valeur de recherche
    const orderColumnIndex = request.input('order[0][column]') // Index de la colonne à trier
    const orderDirection = request.input('order[0][dir]') // Direction du tri (asc/desc)

    // Récupérer les informations sur les colonnes
    const columns = request.input('columns')

    // Construction de la requête de base avec jointure sur la campagne
    let query = Url.query()
      .preload('campaign') // Charger la relation campaign
      .select('urls.*') // Sélectionner toutes les colonnes de la table urls

    // Filtrage par recherche global
    if (searchValue) {
      applyGlobalFilter(query, columns, searchValue)
    }

    applyColumnFilter(query, columns)

    // Tri
    const orderColumn = columns[orderColumnIndex]?.name || 'createdAt' // Utiliser le nom du champ pour le tri
    if (orderColumn === 'campaignId') {
      query
        .join('campaigns', 'urls.campaign_id', 'campaigns.id')
        .orderBy('campaigns.name', orderDirection)
    } else {
      query.orderBy(orderColumn, orderDirection)
    }

    // Pagination
    const totalRecords = await query.clone().count('* as total')
    const filteredRecords = await query.clone().offset(start).limit(length)

    // Formatage des données pour DataTables
    const data = filteredRecords.map((url) => ({
      id: url.id,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      matchingKey: url.matchingKey,
      clicksCount: url.clicksCount,
      campaign: url.campaign ? url.campaign.name : 'N/A', // Afficher le nom de la campagne ou 'N/A'
      createdAt: url.createdAt.toFormat('dd/MM/yyyy HH:mm:ss'), // Formater la date de création
      expiresAt: url.expiresAt ? url.expiresAt.toFormat('dd/MM/yyyy HH:mm:ss') : 'N/A', // Formater la date d'expiration ou 'N/A'
    }))

    return response.json({
      draw: parseInt(draw, 10),
      recordsTotal: totalRecords[0].$extras.total,
      recordsFiltered: totalRecords[0].$extras.total,
      data,
    })
  }

  async datatableExcel({ request, response }: HttpContext) {
    const searchValue = request.input('search.value') // Valeur de recherche

    // Récupérer les informations sur les colonnes
    const columns = request.input('columns')

    // Construction de la requête de base avec jointure sur la campagne
    let query = Url.query()
      .preload('campaign') // Charger la relation campaign
      .select('urls.*') // Sélectionner toutes les colonnes de la table urls

    // Filtrage par recherche global
    if (searchValue) {
      applyGlobalFilter(query, columns, searchValue)
    }

    applyColumnFilter(query, columns)

    // Exécuter la requête pour obtenir les résultats<hu
    const urls = await query.exec()

    // Préparer les données pour le fichier Excel
    const data = urls.map((url) => ({
      'ID': url.id,
      'Original URL': url.originalUrl,
      'Short URL': url.shortUrl,
      'Key': url.matchingKey,
      'Clicks Count': url.clicksCount,
      'Campaign Name': url.campaign?.name || 'N/A', // Utiliser le nom de la campagne ou 'N/A' si non définie
      'Created At': url.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'), // Formater la date
      'Expires At': url.expiresAt ? url.expiresAt.toFormat('yyyy-MM-dd HH:mm:ss') : 'N/A', // Formater la date si elle existe
    }))

    // Créer un nouveau classeur Excel
    const workbook = xlsx.utils.book_new()

    // Convertir les données en feuille de calcul
    const worksheet = xlsx.utils.json_to_sheet(data)

    // Ajouter la feuille de calcul au classeur
    xlsx.utils.book_append_sheet(workbook, worksheet, 'URLs')

    // Générer le fichier Excel en mémoire
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Convertir le buffer en base64
    const base64 = buffer.toString('base64')

    // Retourner la réponse JSON avec le fichier encodé en base64
    return response.json({
      file: `data:application/vnd.ms-excel;base64,${base64}`,
    })
  }
}
