<template>
  <Card class="payment-card">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-3">
      <label for ="firstName"> Name on card</label>
      <InputText
         id="card-first-name"
         type="text"
         class="p-inputtext-lg"
         v-model="cardDetails.firstName"
         />
         <div class="p-field p-col p-md-3">
        <label for="l">Lastname</label>
        <InputText
          id="card-last-name"
          type="text"
          class="p-inputtext-lg"
          v-model="cardDetails.lastName"
          
        />
      </div> 
    </div>
  </Card>
</template>


<script>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
export default {
  components:{
    Card,
    InputNumber,
    InputText
  }
  
}
</script>