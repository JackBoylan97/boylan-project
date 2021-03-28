<template>
  <div class="productContainer">
    <div
      v-for="product in products"
      :key="product.id"
      @click="displayProduct(product)"
    >
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header>
          <br>
          <img :src="`./${product.img}`"  id="quick-view" class="expand" alt="user header" />
                  <Button label="Quick View" icon="" 
        class="p-button-text p-button-plain"
        iconPos="right" @click="displayProduct(product)"/>
        </template>
        <template #title>
          <span
            ><h2 class="prod-title">{{ product.title }}</h2></span
          >
          <br>
        </template>
      </Card>
    </div>
    <div v-if="popUpBox === true">
      <Product :product="clickedProduct" v-on:closeBox="popUpBox = false" />
    </div>
  </div>
</template>
<script>
import Card from "primevue/card";
import Button from 'primevue/button'
import { fetchProductsDB } from "../firebase/database.js";
import Product from "../components/Product.vue";
export default {
  components: {
    Product,
    Card,
    Button
  },
  data() {
    return {
      clickedProduct: null,
      popUpBox: false,
      products: [],
      num: 1,
    };
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      const products = await fetchProductsDB();

      this.products = products;
    },
    displayProduct(product) {
      this.clickedProduct = product;
      this.popUpBox = true;
    },
  },
};
</script>
