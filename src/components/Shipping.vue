<template>
  <h3>Shipping Details</h3>
  <div class="checkout-container">
    
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-3">
        <label for="firstname6">Firstname</label>
        <InputText
          id="firstname6"
          type="text"
          class="p-inputtext-lg"
          v-model="firstName"
        />
      </div>
      <div class="p-field p-col p-md-3">
        <label for="lastname6">Lastname</label>
        <InputText
          id="last-name"
          type="text"
          class="p-inputtext-lg"
          v-model="lastName"
        />
      </div>

      <div class="break" />
      <div class="p-field p-col p-md-2">
        <label for="telephone">Telephone</label>
        <InputText id="telephone" class="p-inputtext-lg" v-model="telephone" />
      </div>
      <div class="p-field p-col p-md-2">
        <label for="email"> Email</label>
        <InputText id="email" class="p-inputtext-lg" v-model="email" />
      </div>
      <div class="break" />
      <div class="p-field p-col p-md-6">
        <label for="address">Address Line 1</label>
        <InputText
          id="address"
          rows="1"
          v-model="address1"
          class="p-inputtext-lg"
        />
      </div>
      <div class="break" />
      <div class="p-field p-col p-md-6">
        <label for="address2">Address Line 2</label>
        <InputText
          id="address2"
          type="text"
          v-model="address2"
          class="p-inputtext-lg"
        />
      </div>
      <div class="break" />
      <div class="p-field p-col p-md-3">
        <label for="state">City</label>
        <InputText
          id="city"
          type="text"
          v-model="city"
          class="p-inputtext-lg"
        />
      </div>
      <div class="p-field p-col-12 p-md-1">
        <label for="zip">Postcode</label>
        <InputText
          id="zip"
          type="text"
          v-model="postcode"
          class="p-inputtext-lg"
        />
      </div>
      <Button labe="Next" @click="nextPage()" icon="pi pi-angle-right" />
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
export default {
  components: {
    InputText,
    Button,
    
  },
  methods:{
    nextPage(){
      this.$emit('next-page', {pageIndex: 0})
    }
  }
};
</script>
<style>
.break {
  flex-basis: 100%;
  height: 0;
}
</style>
