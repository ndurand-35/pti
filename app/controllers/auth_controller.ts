import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  public async showLogin({ view }: HttpContext) {
    return view.render('pages/admin/login')
  }
  
 // Traitement de la connexion
 public async login({ request, auth, response, session }: HttpContext) {
  const { email, password } = request.only(['email', 'password'])

  try {
    await auth.use('web').attempt(email, password)
    return response.redirect('/admin/dashboard')
  } catch {
    session.flash({ error: 'Identifiants incorrects' })
    return response.redirect().back()
  }
}

// Déconnexion
public async logout({ auth, response }: HttpContext) {
  await auth.logout()
  return response.redirect('/admin/login')
}

}