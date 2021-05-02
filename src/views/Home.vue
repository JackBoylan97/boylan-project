<template>
  <div class="content-container">
    <!--Using p-grid classes supplied by primeVue
    results in better structure and easier seperation
     -->
    <div class="p-grid">
      <div class="p-col" style="margin-left: 20px;">
        <h2 class="titleHome">Welcome to Hot Sauce Co!&#x1F525;</h2>
        <p style="" class="homeDetails">
          Here at Hot Sauce Co we take pride in providing spicy sauce to test
          your sinuses! Our products are from all over the globe and are
          delivered straight to your doorstep. <br /><br />
          With Hot Sauce Co its not just about what heat you can handle. Flavour is
          our No1 priority here and we have a wide range of products to suit
          everyone!
        </p>
      </div>
      <div class="p-col">
        <img :src="`./ChilliHome.jpg`" class="imageHome" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
};
</script>
