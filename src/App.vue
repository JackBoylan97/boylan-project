<template id="app">
  <header id="header">
  <img :src="`logo.png`" alt="Nature" class="webLogo">
   <div style="margin-left:auto; margin-right:auto;">
          <Menubar :model="items" class="p-menubar">
            <template #start>
              <!---Put search bar in here somewhere-->
            </template>
            <template #end>
              <!--add basket here-->
              
            </template>
          </Menubar>
  </div>
  </header>
 
          <br>
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
          to: "/contact"
        },
        {
          label: "Cart",
          icon: "pi pi-fw pi-shopping-cart",
          styleClass: "align-right",
          to: "/basket",
        },
      ],
    };
  },
};
</script>


