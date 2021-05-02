<template>
  <div class="content-container">
    <div class="basket-box">
      <!-- Using v-if to check if anything has been added to basket-->
      <div v-if="!basket.length">
        <h1 style="text-align: center;">Your basket is empty!</h1>
        <br>
        <br>
      </div>
      <!-- If a product is in basket display the table -->
      <div v-if="basket.length">
        <br />

        <!-- :value is ued to query basket-->
        <DataTable :value="basket">
          <template #header>
            <div class="table-header">
              <h1>Your basket</h1>
            </div>
          </template>

          <!-- Displaying data via scope-->
          <Column field="img">
            <template #body="scope">
              <img id="image" :src="`./${scope.data.img}`" />
              <Button
                label="Remove"
                style="background: #e32636;"
                class="p-buttonset"
                iconPos="right"
                icon="pi pi-trash"
                @click="removeProduct(scope.index)"
              />
            </template>
          </Column>
          <Column field="title" header="Name">
            <template #body="scope">
              <h3>{{ scope.data.title }}</h3>
            </template>
          </Column>
          <Column field="price" header="Price">
            <template #body="scope">
              <!-- Using toFixed() method to show integer as monetary value-->
              <h3>£ {{ scope.data.price.toFixed(2) }}</h3>
            </template>
          </Column>

          <Column field="quantity" header="Quantity">
            <template #body="scope">
              <!-- Uses of InputNumber, user can decide to quantity of product-->
              <InputNumber
                id="vertical"
                showButtons
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                buttonLayout="vertical"
                :min="1"
                style="width: auto;"
                :max="5"
                v-model="scope.data.quantity"
                @input="
                  updateProductPriceTotal(
                    scope.data.quantity,
                    scope.data.price,
                    scope.data.id
                  )
                "
              >
              </InputNumber>
            </template>
          </Column>
          <Column header="Total">
            <template #body="scope">
              <!-- Display total of product-->
              <h3>£{{ scope.data.priceTotal.toFixed(2) }}</h3>
            </template>
          </Column>
        </DataTable>

        <div class="shippingPriceTitle">
          <!-- Display shipping and total price-->
          <h3>Shipping is: £ {{ shippingPrice.toFixed(2) }}</h3>
          <h1>Total is: £ {{ overAllTotal }}</h1>

          <!-- Proceed to steps method-->
          <Button
            class="p-button-success p-button-lg"
            label="Proceed to checkout"
            @click="proceedCheckout()"
            icon="pi pi-angle-right"
            iconPos="right"
            style="margin-right: 20px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
import DataTable from "primevue/datatable";
import InputNumber from "primevue/inputnumber";
import Column from "primevue/column";
import Button from "primevue/button";

export default {
  components: {
    DataTable,
    InputNumber,
    Column,
    Button,
  },
  data() {
    return {
      //set shipping price
      shippingPrice: 3.5,
    };
  },
  //Global varibal basket used
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
    };
  },
  methods: {
    //Update total price varying on changes
    updateProductPriceTotal(quantity, price, id) {
      let element = this.basket.find((el) => el.id === id);
      element.priceTotal = quantity * price;
    },

    //Set an overall total once user clicks button to proceed to checkout
    proceedCheckout() {
      this.basket.overAllTotal = this.overAllTotal;
      console.log(this.basket);
      this.$router.push({ path: "/checkout/shipping" });
    },
    //Remove method for removing a product from basket
    removeProduct(index) {
      this.basket.splice(index, 1);
    },
  },
  //Computed property used to check if any changes have been made to basket
  computed: {
    overAllTotal() {
      //find price totals and set to variables
      var a = this.basket.reduce((acc, item) => acc + item.priceTotal, 0);
      //Add overallTotal to shipping price
      var b = a + this.shippingPrice;
      //return the value to two decimal places
      return b.toFixed(2);
    },
  },
};
</script>
<style>
#image {
  width: 150px;
  height: 150px;
}
</style>
