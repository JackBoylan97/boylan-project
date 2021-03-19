import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Basket from '../views/Basket.vue'
import ProductList from '../views/ProductList.vue'
import Checkout from '../views/Checkout.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductList
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
