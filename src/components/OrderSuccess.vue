<template>
  <!-- Success page-->
  <div class="content-container">
    <div style="text-align:center">
      <h1>Order Number</h1>
      <!-- Order number fetched from DB and displayed-->
      {{ orderNum }}
      <div class="success-content">
        Boom! Your order was a success, we want to thank you for considering Hot
        Sauce Co and we hope you enjoy the product!
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      confirmed: false,
    };
  },
  //Imported from Parent
  props: ["orderNum"],
  methods: {},
};
</script>
<style scoped>
.success-content {
  margin: 20px;
}
</style>
