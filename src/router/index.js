import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Basket from '../views/Basket.vue'
import ProductList from '../views/ProductList.vue'
import Checkout from '../views/Checkout.vue'
import Shipping from '../components/Shipping.vue'
import Payment from '../components/Payment.vue'
import Confirmation from '../components/Confirmation.vue'
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
    path: '/products',
    name: 'Products',
    component: ProductList
  },{
    path: '/basket',
    name: 'Basket',
    component: Basket,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    children: [{
        path: '/checkout/shipping',
        name: 'Shipping',
        component: Shipping
      },
      {
        path: '/checkout/payment',
        name: 'Payment',
        component: Payment
      },
      {
        path: '/checkout/confirmation',
        name: 'Confirmation',
        component: Confirmation 
    }]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
