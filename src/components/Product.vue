<template>
  <!--Product display page-->

  <!--Setting parameters for dialog-->
  <Dialog
    :dismissableMask="true"
    v-model:visible.sync="dialogVisible"
    @hide="closeBox"
    :responsive="true"
    :modal="true"
    :closable="true"
    style="border-radius: 65px;"
    class="product-box"
  >
    <template #header>
      <h1 style="text-decoration: underline;" class="product-dialog-title">
        {{ product.title }}
      </h1>
    </template>
    <div class="p-grid">
    
        <img :src="`./${product.img}`" class="image" modal="true" style="margin-top: 10px;" />
      
    <div>
  <h5 style="margin-top: 0.5rem;">Price: £{{ displayPrice }}</h5>

        {{ product.description }}
        </div>
        <br>
        <br>
    </div>
    <div>
      <!--
        VALIDATION FOR CHECKING STOCK
        
        If the the product.stock value is > 0
        then display the option to add the stock to basket
      
      -->

      <div v-if="product.stock > 0" class="p-grid">
        <InputNumber
          class="quantity-selector"
          showButtons
          v-model="quantity"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :min="1"
          :max="5"
          buttonLayout="horizontal"
        />
        <Button
          label="Add to basket"
          class="p-button-success"
          style="margin-left: 4.5rem;"
          @click="addToBasket(product, quantity)"
        >
        </Button>
      </div>

      <!-- Using v-else 
      
      -->
      <p v-else style="text-align: center; color: red;">Out of Stock</p>
    </div>

    <!-- TabView component used to display product details-->
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
  <Toast />
</template>

<script>
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
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
    Button,
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
      //Firestore does not display floats, so toFixed() method used to display monetary values
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
      //.find(finds the element that satifises,
      //Set productInBasket to product where id === product ID
      const productInBasket = this.basket.find((b) => b.id === product.id);

      //Validation, User can only purchase 5 of each product
      if (quantity > 5) {
        quantity = 0;
        debugger;
        this.$toast.add({
          severity: "error",
          summary: "Max Limit",
          life: 3000,
          detail: "You can only order a total of 5 products",
        });
      }
      //if no element exists, add the product to basket
      else if (productInBasket == undefined) {
        debugger;
        var priceTotal = product.price * quantity;
        this.basket.push({ ...product, quantity, priceTotal });
        this.$toast.add({
          severity: "success",
          summary: "Product Added",
          life: 2500,
          detail: quantity + " " + product.title + " added to basket.",
        });
      }
      //if a product does exist then add the quantity to the product quantity
      else if (productInBasket.quantity + quantity > 5) {
        debugger;
        this.$toast.add({
          severity: "error",
          life: 3000,
          summary: "Exceeded Limit",
          detail:
            "You can only order a total 5 products. You have " +
            productInBasket.quantity +
            " currently",
        });
      } else {
        //set overall quantity
        productInBasket.quantity += quantity;
        //set overall price
        productInBasket.priceTotal =
          productInBasket.price * productInBasket.quantity;
        //Inform user of success via Toast
        this.$toast.add({
          severity: "success",
          life: 2500,
          summary: "Product Added",
          detail:
            quantity +
            " " +
            productInBasket.title +
            " added to basket. You have " +
            productInBasket.quantity +
            " in total",
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
