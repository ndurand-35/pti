/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const RedirectController = () => import('#controllers/redirects_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const UsersController = () => import('#controllers/users_controller')
const CampaignsController = () => import('#controllers/campaigns_controller')

router.on('/').render('pages/home')

router.group(() => {


  router.group(() => {
    router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard')
    router.resource('users', UsersController).as('users')
    router.resource('campaigns', CampaignsController).as('campaigns')
  }).middleware(middleware.auth())

  /* LOGIN */
  router.group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('show');
    router.post('/login', [AuthController, 'login']).as('action');
  }).as('login')
  router.get('/logout', [AuthController, 'logout']).as('logout')

  /* REGISTER */
  router.group(() => {
    router.get('', [AuthController, 'showRegister']).as('show')
    router.post('', [AuthController, 'register']).as('action')
  })
    .prefix('/register')
    .as('register')
    .middleware(middleware.noUser())
}).prefix('/admin').as('admin')



/* FRONT */
router.get('/:shortUrl', [RedirectController, 'redirect']);