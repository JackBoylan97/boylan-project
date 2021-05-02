import { createRouter, createWebHistory } from "vue-router";
//importing components used for routing
import Contact from "../views/Contact.vue";
import Home from "../views/Home.vue";
import Basket from "../views/Basket.vue";
import ProductList from "../views/ProductList.vue";
import Checkout from "../views/Checkout.vue";
import Shipping from "../components/Shipping.vue";
import Payment from "../components/Payment.vue";
import Confirmation from "../components/Confirmation.vue";

//setting routes (setting html /pathways)
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: ProductList,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    children: [
      {
        path: "/checkout/shipping",
        name: "Shipping",
        component: Shipping,
      },
      {
        path: "/checkout/payment",
        name: "Payment",
        component: Payment,
      },
      {
        path: "/checkout/confirmation",
        name: "Confirmation",
        component: Confirmation,
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
