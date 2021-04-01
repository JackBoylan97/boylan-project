<template>
<div class="content-container">
  <div style="text-align:center">
  <h1 > Order Number {{orderNum}}</h1>
  <div class="success-content">
    Boom! Your order was a success, we want to thank you for considering Hot Sauce Co and we hope you enjoy the product! 
  </div>
  </div>
</div>
</template>
<script>

export default ({
 data(){
   return{
     loading: true,
     confirmed: false
   }
 },
 
props: ['orderNum'],
 methods:{
 }
})
</script>
<style scoped>
.success-content{
  margin: 20px;
}
</style>