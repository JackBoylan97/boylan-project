<template>
  <div class="productContainer">
  <div v-for="product in products" :key="product.id" @click="displayProduct(product)">
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
            
          </div>
        </el-card>
  </div>
  <div v-if="popUpBox === true">
       <Product  :product="clickedProduct" v-on:closeBox="popUpBox = false"/>
       </div>
  </div>
</template>
<script>
import {fetchProductsDB} from "../firebase/database.js"
import Product from "../components/Product.vue"
export default {
  components:{
    Product
  },
  data() {
    return {
      clickedProduct: null,
      popUpBox: false,
      products: [],
      num: 1,
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
    displayProduct(product){
      console.log(product)
      this.clickedProduct = product
      this.popUpBox = true

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

