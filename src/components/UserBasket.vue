<template>
  <div class="content-container">
    <div v-if="!basket.length">
      <h1>Your basket is empty!</h1>
    </div>
    <div v-if="basket.length">
      <br />
      <DataTable :value="basket">
        <template #header>
          <div class="table-header">
            <h1>Your basket</h1>
          </div>
        </template>
        <Column field="img">
          <template #body="scope">
            <img id="image" :src="`./${scope.data.img}`" />
             <Button 
            label="Delete"
            style="background: #e32636"
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
            <h3>£ {{ scope.data.price.toFixed(2) }}</h3>
          </template>
        </Column>

        <Column field="quantity" header="Quantity">
          <template #body="scope">
            <InputNumber
              id="vertical"
              showButtons
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              buttonLayout="vertical"
              :min="1"
              style="width: 4rem"
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
            <h3>£{{ scope.data.priceTotal.toFixed(2) }}</h3>
          </template>
        </Column>
      </DataTable>
      <div class="shippingPriceTitle">
        <h3>Shipping is £ {{ shippingPrice }}</h3>
      </div>
      <div class="totalTitle">
        <h1>Total is £ {{ overAllTotal }}</h1>
        <Button
          label="Proceed to checkout"
          @click="proceedCheckout()"
          icon="pi pi-angle-right"
          iconPos="right"
        />
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
      shippingPrice: 3.5,
    };
  },
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
    };
  },
  methods: {
    updateProductPriceTotal(quantity, price, id) {
      let element = this.basket.find((el) => el.id === id);
      element.priceTotal = quantity * price;
    },
    proceedCheckout() {

      this.basket.overAllTotal = this.overAllTotal;
      console.log(this.basket)
      this.$router.push({ path: "/checkout/shipping" });
    },
    removeProduct(index) {
      this.basket.splice(index, 1);
    },
  },
  computed: {
    overAllTotal() {
      var a = this.basket.reduce((acc, item) => acc + item.priceTotal, 0);
      var b = a + this.shippingPrice;
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
