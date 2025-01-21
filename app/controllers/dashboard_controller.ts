import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

  public async showDashboard({ view }: HttpContext) {
    return view.render('pages/admin/dashboard')
  }

}