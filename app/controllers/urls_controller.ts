import Campaign from '#models/campaign'
import Url from '#models/url'
import { createUrl } from '#validators/urls'
import type { HttpContext } from '@adonisjs/core/http'

export default class UrlsController {
  /**
   * Display a list of resource
   */
  async index({ request, view }: HttpContext) {
    const page = request.input('page', 1) // Numéro de page (par défaut 1)
    const limit = 10 // Nombre d'utilisateurs par page

    const urls = await Url.query().orderBy('created_at', 'desc').paginate(page, limit) // Récupère les campagnes triés par date de création
    return view.render('pages/admin/url/index', { urls })
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
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
