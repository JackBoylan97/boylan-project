<template>
<div class="payment-container">
  <h3>Payment Details</h3>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-3">
        <label for="cardholderName"> Cardholder Name </label>
        <InputText
          id="cardholder-name"
          type="text"
          class="p-inputtext-lg"
          v-model="cardholder.name"
        />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="cardNumber"> Card Number</label>
        <InputMask
          mask="9999-9999-9999-9999"
          class="p-inputmask p-inputtext-lg"
          v-model="cardholder.number"
        />
      </div>
      <div class="p-field p-col-2">
        <label for="date">Date</label>
        <InputMask
          mask="99/99"
          class="p-inputmask p-inputtext-lg"
          v-model="cardholder.date"
        />
      </div>
      <div class="p-field p-col-2">
        <label for="cvv">CVV</label>
        <InputMask
          mask="999"
          v-model="cardholder.cvv"
          class="p-inputmask p-inputtext-lg"
        />
      </div>
      <div class="p-grid p-nogutter p-justify-between">
        <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
        <Button
          label="Next"
          @click="nextPage()"
          icon="pi pi-angle-right"
          class="btnNext"
          iconPos="right"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Button from 'primevue/button'
export default {
  components: {
    InputMask,
    InputText,
    Button
  },
  methods: {
    nextPage() {
      this.$emit("next-page", {formData:{cardholder: this.cardholder}, pageIndex: 1 });
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 1 });
    },
  },
  data() {
    return {
      cardholder: 
        {
          name: "",
          number: "",
          date: "",
          cvv: "",
        },
    };
  },
};
</script>
<style scoped>
.btnNext{
  float: right;
}
.payment-container{
   margin: auto;
  width: 60%;
  padding: 10px;
}
</style>