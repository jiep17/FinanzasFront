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
    path: '/clients',
    name: 'RegisterClient',
    component: ()=>import('../pages/Client-register')
  },
  {
    path: '/transactions',
    name: 'transaction',
    component: () => import('../components/transactions')
  },
  {
    path: '/transactions/new',
    name: 'add-transaction',
    component: ()=>import('../pages/add-transaction')
  },
  {
    path: '/transactions/:id',
    name: 'edit-transaction',
    component: ()=> import('../pages/edit-transaction')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
