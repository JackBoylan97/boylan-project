<template>
  <div class="content-container">
    <div class="product-list-header">
      <h1 class="product-list-title">Hot Sauces</h1>
      <p class="product-list-details">
        There are hundreds of Chilli varieties from all around the world, each
        with their own heat level and flavour. Some are common varieties and
        some are very rare, but if they've been made into a decent sauce -
        you'll find it here...
      </p>
    </div>
    <div class="productContainer">
      <!--
Using v-for which is a vue directive , reduces a lot of code

Acccess all products inside products, results in easy use of grabbing
each product and display info



-->
      <div v-for="product in products" :key="product.id">
        <!--Card component used  -->
        <Card style="width: 25rem; margin-bottom: 2em">
          <template #title>
            <img
              :src="`./${product.img}`"
              id="quick-view"
              class="expand"
              alt="user header"
            />

            <!-- Button to display product-->
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
      <!-- If button is clicked to display, show dialog box containing product-->
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
  //mounted method use to call database function to grab all methods
  mounted() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      //set result of database query to products
      const products = await fetchProductsDB();
      //set to this.products
      this.products = products;
    },
    //Display content
    displayProduct(product) {
      this.clickedProduct = product;
      this.popUpBox = true;
    },
  },
};
</script>
