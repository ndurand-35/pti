import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class NoUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const userExists = await User.query().first()
    if (userExists) {
      return ctx.response.redirect().toRoute('admin.login.show') // Redirigez vers la page de connexion
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}