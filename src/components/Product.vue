<template>
  <Dialog
    :dismissableMask="true"
    :header="product.title"
    v-model:visible.sync="dialogVisible"
    @hide="closeBox"
    :responsive="true"
    :modal="true"
    :closable="true"
    class="product-box"
  >
    <img :src="`./${product.img}`" class="image" modal="true" />
    <p>£{{ displayPrice }}</p>
    <div>
      <div v-if="product.stock > 0">
        <InputNumber
          class="quantity-selector"
          showButtons
          v-model="quantity"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :min="1"
          
          buttonLayout="vertical"
        >
        </InputNumber>
        <button @click="addToBasket(product, quantity)">
          Add to Basket
        </button>
      </div>
      <p v-else style="text-align: center; color: red;">Out of Stock</p>
    </div>

    <TabView>
      <TabPanel header="Ingredients">
        {{ product.ingredients }}
      </TabPanel>
      <TabPanel header="Reviews">
        Nothing added yet
      </TabPanel>
      <TabPanel header="Storage Info">
        {{ product.storage }}
      </TabPanel>
    </TabView>
  </Dialog>
  <Toast  />
</template>

<script>
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
export default {
  inheritAttrs: false,
  props: ["product"],
  components: {
    Dialog,
    InputNumber,
    TabView,
    Toast,
    TabPanel,
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
    displayPrice() {
      var a = this.product.price;
      var b = a.toFixed(2);
      return b;
    },
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

      if (quantity > 5) {
        quantity = 0;
        debugger
        this.$toast.add({
          severity: "error",
          summary: "Max Limit",
          life: 3000,
          detail: "You can only order a total of 5 products",
        });
        
      }
      //if no element exists, add the product to basket

     else if (productInBasket == undefined) {
       debugger
        var priceTotal = product.price * quantity;
        this.basket.push({ ...product, quantity, priceTotal });
        this.$toast.add({
          severity: "success",
          summary: "Product Added",
          life: 2500,
          detail: quantity+" "+product.title+" added to basket.",
        });
        
      }
      //if a product does exist then add the quantity to the product quantity
      else if (productInBasket.quantity + quantity > 5) {
        debugger
        this.$toast.add({
          severity: "error",
          life: 3000,
          summary: "Exceeded Limit",
          detail: "You can only order a total 5 products. You have "+productInBasket.quantity+" currently",
        });
      } else {
        productInBasket.quantity += quantity;
        productInBasket.priceTotal =
        productInBasket.price * productInBasket.quantity;
        this.$toast.add({
          severity: "success",
          life: 2500,
          summary: "Product Added",
          detail: quantity+" "+productInBasket.title+" added to basket. You have "+productInBasket.quantity+" in total",
        });
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
.p-dialog-title {
  font-size: large;
}

</style>
