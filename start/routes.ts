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
const AuthController = () => import('#controllers/auth_controller')

router.on('/').render('pages/home')

router.group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('login');
    router.post('/login', [AuthController, 'login']).as('login.post');
}).prefix('/admin').as('admin')



router.get('/:shortUrl', [RedirectController, 'redirect']);