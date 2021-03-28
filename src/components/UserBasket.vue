<template>
<div v-if="!basket.length">
  <h1> Your basket is empty! </h1> 
</div>
<div v-if="basket.length">
  <DataTable :value="basket">
    <template #header>
      <div class="table-header">
        Your basket 
      </div>
    </template>
    <Column  field="img">
      <template #body="scope">
        <img id="image" :src="`./${scope.data.img}`" />
          <p @click="removeProduct(scope.data)"> Remove </p>
      </template>
    </Column>
    <Column field="title">
    </Column>
    <Column field="price" header="Price"></Column>
    <Column field="quantity" header="Quantity">
      <template #body="scope">
        <InputNumber 
          id="vertical"
          showButtons
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          buttonLayout="vertical"
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
       <h1>£ {{ scope.data.priceTotal.toFixed(2) }}</h1>
      </template>
    </Column>
  </DataTable>
  <div class="shippingPriceTitle">
    <h1> Shipping is £ {{shippingPrice}}</h1>
  </div>
  <div class="totalTitle">
  <h1>Total is £ {{overAllTotal}}</h1>
  <Button label="Proceed to checkout" @click="proceedCheckout()" icon="pi pi-angle-right" iconPos="right"/>
  </div>
</div>
</template>

<script>
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
import DataTable from "primevue/datatable";
import InputNumber from "primevue/inputnumber";
import Column from "primevue/column"
import Button from "primevue/button"

export default {
  components: {
    DataTable,
    InputNumber,
    Column,
    Button
  },
  data() {
    return {
      shippingPrice: 3.50
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
      
    },
    proceedCheckout(){
      this.basket.overAllTotal = this.overAllTotal      
      this.$router.push({path: '/checkout/shipping'})

    }
  },
  computed: {
    overAllTotal(){
      debugger
     var a = this.basket.reduce((acc, item)=> acc + item.priceTotal,0) 
     var b = a + this.shippingPrice
     return b.toFixed(2);
    }
  }
};
</script>
<style>
#image {
  width: 150px;
  height: 150px;
}

</style>
