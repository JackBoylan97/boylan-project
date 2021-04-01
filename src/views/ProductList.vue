<template>
<div class="content-container">
  <div class="productContainer">
    <div
      v-for="product in products"
      :key="product.id"
      
    >
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #title>
          <img
            :src="`./${product.img}`"
            id="quick-view"
            class="expand"
            alt="user header"
          />
          
          <Button 
            label="Quick View"
            class="p-button-text p-button-plain"
            iconPos="right"
            @click="displayProduct(product)"
          />
        </template>
        <template #header>
          <span
            ><h1 class="prod-title">{{ product.title }}</h1></span
          >
          <br />
        </template>
      </Card>
    </div>
    <div v-if="popUpBox === true">
      <Product :product="clickedProduct" v-on:closeBox="popUpBox = false" />
    </div>
  </div>
  </div> 
</template>
<script>
import Card from "primevue/card";
import Button from "primevue/button";
import { fetchProductsDB } from "../firebase/database.js";
import Product from "../components/Product.vue";
export default {
  components: {
    Product,
    Card,
    Button,
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
