<template>
  <h1>{{ product }}</h1>
  <el-dialog :title="product.title" v-model="dialogVisible" @close="closeBox">
    <el-image :src="`./${product.img}`" class="image"> </el-image>

    <el-input-number v-model="quantity"> </el-input-number>

    <el-button @click="addToBasket(product, quantity)">
      Add to Basket</el-button
    >

    <el-tabs @tab-click="changeTab()">
      <el-tab-pane label="Ingredients">{{product.ingredients}}</el-tab-pane>
      <el-tab-pane label="Reviews"></el-tab-pane>
      <el-tab-pane label="Storage Info">{{product.storage}}</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
export default {
  inheritAttrs: false,
  props: ["product"],
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
    };
  },
  data() {
    return {
      quantity: 1,
      dialogVisible: true,
    };
  },
  methods: {
    closeBox() {
      this.$emit("closeBox", "false");
      this.quantity = 0;
    },
    changeTab() {},
    addToBasket(product, quantity) {
//.find(finds the element that satifises)
      const productInBasket = this.basket.find((b) => b.id === product.id);
//if no element exists, add the product to basket
      if (productInBasket == undefined) {
        this.basket.push({ ...product, quantity });
      } 
//if a product does exist then add the quantity to the product quantity      
      else {
        productInBasket.quantity += quantity;
      }
      console.log(this.basket);
    },
  },
};
</script>

<style>
.image {
  width: 100%;
  display: block;
}
</style>
