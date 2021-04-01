<template>
  <div class="content-container">
    <h3>Payment Details</h3>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-3">
        <label for="cardholderName"> Cardholder Name </label>
        <InputText
          :class="{ 'p-invalid': validationErrors.name && submitted }"
          id="cardholder-name"
          type="text"
          class="p-inputtext-lg"
          v-model="cardholder.name"
        />
        <small v-show="validationErrors.name && submitted" class="p-error"
          >Name is required
        </small>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="cardNumber"> Card Number</label>
        <InputMask
          :class="{ 'p-invalid': validationErrors.number && submitted }"
          mask="9999-9999-9999-9999"
          class="p-inputmask p-inputtext-lg"
          v-model="cardholder.number"
        />

        <small v-show="validationErrors.number && submitted" class="p-error"
          >Number is required
        </small>
      </div>

      <div class="p-field p-col-2">
        <label for="date">Date</label>
        <InputMask
          :class="{ 'p-invalid': validationErrors.date && submitted }"
          mask="99/99"
          class="p-inputmask p-inputtext-lg"
          v-model="cardholder.date"
        />

        <small v-show="validationErrors.date && submitted" class="p-error"
          >Date is required
        </small>
      </div>

      <div class="p-field p-col-2">
        <label for="cvv">CVV</label>
        <InputMask
          :class="{ 'p-invalid': validationErrors.cvv && submitted }"
          mask="999"
          v-model="cardholder.cvv"
          class="p-inputmask p-inputtext-lg"
        />
        
        <small v-show="validationErrors.cvv && submitted" class="p-error"
          >CVV is required
        </small>
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
import Button from "primevue/button";
export default {
  components: {
    InputMask,
    InputText,
    Button,
  },
  methods: {
    nextPage() {
      this.submitted = true;
      if(this.validateForm()){
      this.$emit('next-page', {
        formData: { cardholder: this.cardholder },
        pageIndex: 1,
      });
      }
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 1 });
    },
    validateForm(){
      if (!this.cardholder.name.trim())
        this.validationErrors["name"] = true;
      else delete this.validationErrors["name"];

      if (!this.cardholder.number.trim())
        this.validationErrors["number"] = true;
      else delete this.validationErrors["number"];

      if (!this.cardholder.date.trim())
        this.validationErrors["date"] = true;
      else delete this.validationErrors["date"];

      if (!this.cardholder.cvv.trim())
        this.validationErrors["cvv"] = true;
      else delete this.validationErrors["cvv"];

      return !Object.keys(this.validationErrors).length;
    }
  },
  data() {
    return {
      submitted: false,
      validationErrors: {},
      cardholder: {
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
.btnNext {
  float: right;
}
</style>
