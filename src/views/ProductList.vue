<template>
<div class="content-container">
  <div class="product-list-header">
  <h1 class="product-list-title">Hot Sauces </h1> 
  <p class="product-list-details">There are hundreds of Chilli varieties from all around the world, each with their own heat level and flavour. Some are common varieties and some are very rare, but if they've been made into a decent sauce - you'll find it here...</p>
  </div>
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
