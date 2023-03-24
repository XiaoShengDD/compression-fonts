import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/sync',
    name: 'sync',
    label: 'sync',
    component: () => import('@/view/sync'),
  },

  {
    path: '/qrcode',
    name: 'qrcode',
    label: 'qrcode',
    component: () => import('@/view/qrCode'),
  },

  {
    path: '/card',
    name: 'card',
    label: 'card',
    component: () => import('@/view/card'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router
