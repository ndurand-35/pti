import Campaign from '#models/campaign'
import { createCampaign } from '#validators/campaign'
import type { HttpContext } from '@adonisjs/core/http'

export default class CampaignsController {
  /**
   * Display a list of resource
   */
  async index({ request, view }: HttpContext) {
    const page = request.input('page', 1) // Numéro de page (par défaut 1)
    const limit = 10 // Nombre d'utilisateurs par page

    const campaigns = await Campaign.query().orderBy('created_at', 'desc').paginate(page, limit) // Récupère les campagnes triés par date de création
    return view.render('pages/admin/campaign/index', { campaigns })
  }

  /**
   * Display form to create a new record
   */
  async create({view}: HttpContext) {
    return view.render('pages/admin/campaign/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    const payload = await request.validateUsing(createCampaign)
    await Campaign.create(payload)

    return response.redirect().toRoute('admin.campaigns.index')

  }

  /**
   * Show individual record
   */
  async show({ params,view }: HttpContext) {
    const campaignId = params.id
    const campaign = await Campaign.findOrFail(campaignId)
    await campaign.load('urls')
    return view.render('pages/admin/campaign/show', { campaign })

  }

  /**
   * Edit individual record
   */
  async edit({ params,view }: HttpContext) {
        const campaignId = params.id
        const campaign = await Campaign.findOrFail(campaignId)
        return view.render('pages/admin/campaign/edit', { campaign })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
      const campaignId = params.id
        const payload = await request.validateUsing(createCampaign)
    
        const campaign = await Campaign.findOrFail(campaignId)
        await campaign.merge(payload)
        await campaign.save()
    
        return response.redirect().toRoute('admin.campaigns.index')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
