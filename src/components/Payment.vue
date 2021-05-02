<template>
  <div class="content-container">
    <div class="p-fluid p-formgrid p-grid" style="justify-content: center;">
      <div class="p-field p-col p-md-4">
        <label for="cardholderName"> Name on card</label>
        <!--INPUTS & VALIDATIONS -->
        <InputText
          :class="{ 'p-invalid': validationErrors.name && submitted }"
          id="cardholder-name"
          type="text"
          class="p-inputtext-lg p-md-1"
          v-model="cardholder.name"
        />
        <br />
        <!--Display error if validation returns true -->
        <small v-show="validationErrors.name && submitted" class="p-error"
          >Name is required
        </small>
        <br />
        <label for="cardNumber"> Card Number</label>
        <InputMask
          :class="{ 'p-invalid': validationErrors.number && submitted }"
          mask="9999-9999-9999-9999"
          class="p-inputmask p-inputtext-lg"
          v-model="cardholder.number"
        />
        <br />

        <!--Display error if validation returns true -->
        <small v-show="validationErrors.number && submitted" class="p-error"
          >Number is required
        </small>
        <br />

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col">
            <label for="date">Date</label>
            <InputMask
              :class="{ 'p-invalid': validationErrors.date && submitted }"
              mask="99/99"
              class="p-inputmask p-inputtext-lg"
              v-model="cardholder.date"
            />
            <br />
            <!--Display error if validation returns true -->
            <small v-show="validationErrors.date && submitted" class="p-error"
              >Date is required
            </small>
            <!--Display error if validation returns true -->
            <small
              v-show="validationErrors.dateFormat && submitted"
              class="p-error"
              >-Invalid Date format(MM/YY)</small
            >
            <br />
          </div>
          <div class="p-field p-col">
            <label for="cvv">CVV</label>
            <InputMask
              :class="{ 'p-invalid': validationErrors.cvv && submitted }"
              mask="999"
              v-model="cardholder.cvv"
              class="p-inputmask p-inputtext-lg"
            />
            <br />

            <!--Display error if validation returns true -->
            <small v-show="validationErrors.cvv && submitted" class="p-error"
              >CVV is required
            </small>
            <br />
          </div>
</div>
                  <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col">
            <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          </div>
          <div class="p-field p-col">
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
      if (this.validateForm()) {
        this.$emit("next-page", {
          formData: { cardholder: this.cardholder },
          pageIndex: 1,
        });
      }
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 1 });
    },
    validateForm() {
      //VALIDATION METHODS
      if (!this.cardholder.name.trim()) this.validationErrors["name"] = true;
      else delete this.validationErrors["name"];

      if (!this.cardholder.number.trim())
        this.validationErrors["number"] = true;
      else delete this.validationErrors["number"];

      if (!this.cardholder.date.trim()) this.validationErrors["date"] = true;
      else delete this.validationErrors["date"];

      if (!this.cardholder.cvv.trim()) this.validationErrors["cvv"] = true;
      else delete this.validationErrors["cvv"];

      return !Object.keys(this.validationErrors).length;
    },
  },

  computed: {
    /*set the dateValid to same as computed method
    If any changes are made to dataValid, then it will set it to the value
    this.cardholder.date
    
    */

    dateValid() {
      return this.cardholder.date;
    },
  },

  watch: {
    /* Watch for the dateValid changes*/
    dateValid(newValue) {
      //Set regex for date validation
      var re = /^(0[1-9]|1[012])\/\d{2}$/;
      //if the new value isnt `re then set validation error as true`
      //This enables dynamic validation
      if (!re.test(newValue)) {
        this.validationErrors["dateFormat"] = true;
      } else delete this.validationErrors["dateFormat"];
    },
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
