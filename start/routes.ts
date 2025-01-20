/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const RedirectController = () => import('#controllers/redirects_controller')

router.on('/').render('pages/home')


router.get('/:shortUrl', [RedirectController, 'redirect']);