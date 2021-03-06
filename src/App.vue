<template>
  <el-container>
    <el-header>
      <el-row> </el-row>
      <el-menu
        id="navBar"
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link to="/">Home</router-link></el-menu-item
        >
        <el-submenu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3"><router-link to ="/products">Products</router-link></el-menu-item>
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
export default {
  name: "App",
  components: {},
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
