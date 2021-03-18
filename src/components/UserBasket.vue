<template>
  <h1>Your Basket</h1>
  <DataTable :value="basket">
    <Column field="title" header="Title">
    </Column>

    <Column header="Image" field="img">
      <template #body="scope">
        <img id="image" :src="`./${scope.data.img}`" />
      </template>
    </Column>
    <Column field="price" header="Price"></Column>
    <Column field="quantity" header="Quantity">
      <template #body="scope">
        <InputNumber 
          id="vertical"
          showButtons
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          buttonLayout="horizontal"
          :min="1"
          :max="5"
          v-model="scope.data.quantity"
          @input="updateProductPriceTotal(scope.data.quantity , scope.data.price, scope.data.id)"
        >
        </InputNumber>
      </template>
    </Column>
    <Column header="Total">
      <template #body="scope">
       <h1>£ {{ scope.data.priceTotal }}</h1>
      </template>
    </Column>
  </DataTable>
  <div class="totalTitle">
  <h1>Total is {{overAllTotal}}</h1>
  </div>
</template>
<script>
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
import DataTable from "primevue/datatable";
import InputNumber from "primevue/inputnumber";
import Column from "primevue/column";

export default {
  components: {
    DataTable,
    InputNumber,
    Column,
  },
  data() {
    return {
      overAllTotal: null,
    };
  },
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
    };
  },
  methods:{
    updateProductPriceTotal(quantity, price, id){
      debugger
      let element = this.basket.find(el => el.id === id)
      debugger
      element.priceTotal = quantity * price
    }
  },
  watch: {},
};
</script>
<style>
#image {
  width: 150px;
  height: 150px;
}
</style>
