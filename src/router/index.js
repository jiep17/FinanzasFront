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
    path: '/clients/:id',
    name : 'Client',
    component: ()=>import('../components/Client')
  },
  {
    path: '/accounts/:id/transactions',
    name: 'transaction',
    component: () => import('../components/transactions')
  },
  {
    path: '/accounts/:accountId/transactions/new',
    name: 'add-transaction',
    component: ()=>import('../pages/add-transaction')
  },
  {
    path: '/accounts/:accountId/transactions/:id',
    name: 'edit-transaction',
    component: ()=> import('../pages/edit-transaction')
  },
  {
    path: '/clients/:clientId/accounts',
    name: 'Account',
    component: ()=> import('../components/Account')
  },
  {
    path: '/clients/:clientId/accounts/edit',
    name: 'edit-account',
    component: ()=> import('../pages/edit-account')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
