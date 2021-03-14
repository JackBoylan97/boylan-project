<template>
  <h1>Here is the product page</h1>
  <div class="productContainer">
  <div v-for="product in products" :key="product.id">
        <el-card :body-style="{ padding: '55px' }">
          <el-image
            :src="(`./${product.img}`)"
            class="image"
            style="width: 150px; height: 150px"

          ></el-image>
          <div style="padding: 14px;">
            <span
              ><h2>{{ product.title }}</h2></span
            >
            <br />
            <span
              ><h3>Price: £{{ product.price }}</h3></span
            >
            <br />
            
            <el-button @click="addToBasket(product)"> Add to Basket</el-button>
          </div>
        </el-card>
  </div>
  </div>
</template>
<script>
import {fetchProductsDB} from "../firebase/database.js"
import { inject } from 'vue'
import { BasketSymbol } from '../constants/symbols'
export default {
    setup(){
   const basket = inject(BasketSymbol)
     return {
       basket
     }
  },
  data() {
    return {
      products: [],
      num: 1,
      userCart: []
    }
  },
  mounted(){
    this.getAllProducts();
  },
  methods: {
    async getAllProducts(){
      const products = await fetchProductsDB();

      this.products = products;
      console.log(this.products)
    },
    addToBasket(product){
      this.basket.push(product)   
      console.log(this.basket)
    }
  },
};
</script>
<style>
.el-card {
  margin-right: 10px;
  margin-bottom: 10px;
  height: 500px;
  width:  300px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.productContainer{
  display: flex; 
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
   
}
</style>

