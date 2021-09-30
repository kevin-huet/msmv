import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/backoffice',
    name: 'Backoffice',
    component: () => import('../views/backoffice/Home')
  },
  {
    path: '/backoffice/bookings',
    name: 'Bookings',
    component: () => import('../views/backoffice/Bookings')
  },
  {
    path: '/backoffice/code/barrier',
    name: 'BarrierCodes',
    component: () => import('../views/backoffice/BarrierCodes')
  },
  {
    path: '/backoffice/code/promo',
    name: 'PromoCodes',
    component: () => import('../views/backoffice/PromoCodes')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backoffice/Login')
  },
  { path: '/404', component: () => import('../views/error/404.vue') },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
