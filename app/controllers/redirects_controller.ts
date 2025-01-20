import Click from '#models/click';
import Url from '#models/url';
import type { HttpContext } from '@adonisjs/core/http'

export default class RedirectsController {
  
  /**
   * Redirige une URL raccourcie vers son URL d'origine
   */
  public async redirect({ params, response,request, view }: HttpContext) {
    const shortUrl = params.shortUrl;

    // Recherche de l'URL raccourcie dans la base de données
    const url = await Url.query().where('shortUrl', shortUrl).first();

    if (!url) {
      // Retourne une erreur 404 si l'URL n'existe pas
      return view.render('pages/errors/not_found', { error: 'URL not found' });
    }

    await Click.create({
      urlId: url.id,
      ipAddress: request.ip(),
      userAgent: request.header('User-Agent'),
    });

    // Mise à jour du compteur de clics
    url.clicksCount += 1;
    await url.save();

    // Redirection vers l'URL d'origine
    return response.redirect(url.originalUrl);
  }
  
}