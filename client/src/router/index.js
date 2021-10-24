import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { BackOfficeRoutes } from './backoffice'
Vue.use(VueRouter)

let routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backoffice/Login')
  },
  {
    path: '/barrier-code',
    name: 'ClientBarrierCode',
    component: () => import('../views/client/BarrierCode')
  },
  { path: '/404', component: () => import('../views/error/404.vue') },
  { path: '*', redirect: '/404' }
]

routes = routes.concat(BackOfficeRoutes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
