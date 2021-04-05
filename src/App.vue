<template id="app">
  <header id="header">
    <!-- Anything implemented on App.vue will be displayed across
      all components
  
  Setting Navbar
-->
    <img :src="`logo.png`" alt="Nature" class="webLogo" />
    <div style="margin-left:auto; margin-right:auto;">
      <Menubar :model="items" class="p-menubar">
        <template #start>
          <!---Put search bar in here somewhere-->
        </template>
      </Menubar>
    </div>
  </header>

  <br />
  <router-view />
</template>

<script>
import Menubar from "primevue/menubar";
import { provide, ref } from "vue";
import { BasketSymbol } from "./constants/symbols";
export default {
  name: "App",
  components: {
    Menubar,
  },
  setup() {
    const basket = ref([]);

    provide(BasketSymbol, basket);
  },
  data() {
    return {
      items: [
        {
          label: "Home",
          to: "/",
        },
        {
          label: "Products",
          to: "/products",
        },
        {
          label: "Contact",
          to: "/contact",
        },
        {
          label: "Cart",
          icon: "pi pi-fw pi-shopping-cart",
          to: "/basket",
        },
      ],
    };
  },
};
</script>
