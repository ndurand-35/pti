import User from '#models/user'
import { registerValidator } from '#validators/register'
import { editUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1) // Numéro de page (par défaut 1)
    const limit = 10 // Nombre d'utilisateurs par page

    const users = await User.query().orderBy('created_at', 'desc').paginate(page, limit) // Récupère les utilisateurs triés par date de création
    console.log(users)
    return view.render('pages/admin/user/index', { users })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/admin/user/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    await User.create(payload)

    return response.redirect().toRoute('admin.users.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const userId = params.id
    const user = await User.findOrFail(userId)
    return view.render('pages/admin/user/edit', { user })
  }

  /**
   * Edit individual record
   */
  async edit({ params,view }: HttpContext) {
    const userId = params.id
    const user = await User.findOrFail(userId)
    return view.render('pages/admin/user/edit', { user })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    const userId = params.id
    console.log('Hello')
    const payload = await request.validateUsing(editUserValidator)

    const user = await User.findOrFail(userId)
    user.merge(payload)


    return response.redirect().toRoute('admin.users.index')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const userId = params.id
    const user = await User.findOrFail(userId)
    await user.delete()
  }
}
