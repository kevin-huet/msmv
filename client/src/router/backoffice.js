export const BackOfficeRoutes = [
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
    path: '/backoffice/users',
    name: 'Users',
    component: () => import('../views/backoffice/Users')
  },
  {
    path: '/backoffice/pricing',
    name: 'Pricing',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/backoffice/Pricing')
  }
]
