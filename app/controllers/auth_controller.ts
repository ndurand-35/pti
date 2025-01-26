import User from '#models/user'
import { registerValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  public async showLogin({ view, response }: HttpContext) {
    const userExists = await User.query().first()
    if (!userExists) {
      return response.redirect().toRoute('admin.register.show')
    }

    return view.render('pages/admin/auth/login')
  }

  // Traitement de la connexion
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.redirect().toRoute('admin.dashboard')
  }

  // Déconnexion
  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('admin.login.show')
  }

  public async showRegister({ view }: HttpContext) {
    return view.render('pages/admin/auth/register') // Chargez la vue d'inscription
  }

  public async register({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    await User.create(payload)

    session.flash('notification', { type: 'success', message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.' })
    return response.redirect().toRoute('admin.login.show')
  }
}