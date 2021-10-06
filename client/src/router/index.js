import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: Home
  },
  {
    path: '/backoffice',
    name: 'Backoffice',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/backoffice/Home')
  },
  {
    path: '/backoffice/bookings',
    name: 'Bookings',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/backoffice/Bookings')
  },
  {
    path: '/backoffice/code/barrier',
    name: 'BarrierCodes',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/backoffice/BarrierCodes')
  },
  {
    path: '/backoffice/code/promo',
    name: 'PromoCodes',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/backoffice/PromoCodes')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backoffice/Login')
  },
  {
    path: '/backoffice/pricing',
    name: 'Pricing',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/backoffice/Pricing')
  },
  {
    path: '/barrier-code',
    name: 'ClientBarrierCode',
    component: () => import('../views/client/BarrierCode')
  },
  { path: '/404', component: () => import('../views/error/404.vue') },
  { path: '*', redirect: '/404' }
]

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
