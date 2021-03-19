<template>
  <header>
  <br>
  </header>
          <Menubar :model="items">
            <template #start>
              <!---Put search bar in here somewhere-->
            </template>
            <template #end>
              <!--add basket here-->
            </template>
          </Menubar>
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
          label: "Cart",
          icon: "",
          to: "/basket",
        },
      ],
    };
  },
};
</script>

<style>
.p-menubar{
  height: 100px;
}
#app{
  background-color: red;
}
.p-menuitem{
  justify-content: space-between;

}

.p-menuitem-text{
  font-size: xx-large;
  
}

#basket {
  margin-left: auto;
}
</style>
