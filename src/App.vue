<template>
  <el-container>
    <el-header>
      <el-row> </el-row>
      <el-menu
        id="navBar"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link to="/">Home</router-link></el-menu-item
        >
        <el-menu-item index="2"><router-link to ="/products">Products</router-link></el-menu-item>
        <el-menu-item id="basket" index="4"
          ><router-link to="/basket">Basket</router-link>
            <i class="el-icon-goods"></i
        ></el-menu-item>
      </el-menu>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
import { provide, ref } from 'vue';
import {BasketSymbol} from './constants/symbols'
export default {
  name: "App",
  components: {},
  setup(){
    const basket =  ref([])
    provide(BasketSymbol,basket)
}
};
</script>

<style>
.el-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
#navBar {
  display: flex;
}
#basket {
  margin-left: auto;
}
</style>
