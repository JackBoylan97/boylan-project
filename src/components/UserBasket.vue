<template>
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
       <h1>£ {{ scope.data.priceTotal }}</h1>
      </template>
    </Column>
  </DataTable>
  <div class="totalTitle">
  <h1>Total is £ {{overAllTotal}}</h1>
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
  computed: {
    overAllTotal(){
     return this.basket.reduce((acc, item)=> acc + item.priceTotal,0) 
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
