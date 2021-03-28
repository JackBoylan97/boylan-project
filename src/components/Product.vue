<template>
  <Dialog :header="product.title" v-model:visible.sync="dialogVisible" @hide="closeBox">
    <img :src="`./${product.img}`" class="image"/>
    <p>£{{displayPrice}}</p>
    <InputNumber :min="1" :max="5"  buttonLayout="horizontal" v-model="quantity"> </InputNumber>

    <button @click="addToBasket(product, quantity)">
      Add to Basket</button
    >
    <TabView>
	<TabPanel header="Ingredients">
    {{product.ingredients}}
	</TabPanel>
	<TabPanel header="Reviews">
    Nothing added yet
	</TabPanel>
	<TabPanel header="Storage Info">
    {{product.storage}}
	</TabPanel>
</TabView>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
export default {
  inheritAttrs: false,
  props: ["product"],
  components:{
    Dialog,
    InputNumber,
    TabView,
    TabPanel
  },
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
  computed: {
    displayPrice(){
      var a = this.product.price
      var b = a.toFixed(2)
      return b;
    }
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
        var priceTotal = product.price * quantity
        this.basket.push({ ...product, quantity, priceTotal });
      } 
//if a product does exist then add the quantity to the product quantity      
      else {
        debugger
        productInBasket.quantity += quantity;
        productInBasket.priceTotal = productInBasket.price * productInBasket.quantity
        console.log(productInBasket)
      }
    },
  },
};
</script>

<style>
.image {
  width: 200px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.p-dialog-title{
  font-size: large;
}
</style>
