<template>
  <div class="content-container">
    <div
      class="p-fluid p-formgrid p-grid"
      style="margin-right: 30px; margin-left: 30px;"
    >
      <div class="p-field p-col">
        <h3>Shipping details</h3>
        <div>
          <!-- Display shipping details-->
          <label for="class">Name: &nbsp;</label>

          {{ formData.shipping.firstName ? formData.shipping.firstName : "-" }}
          {{ formData.shipping.lastName ? formData.shipping.lastName : "-" }}
        </div>
        <div>
          <label for="Telephone">Telephone: &nbsp;</label>
          {{ formData.shipping.telephone ? formData.shipping.telephone : "-" }}
        </div>
        <div>
          <label for="Email">Email: &nbsp;</label>
          {{ formData.shipping.email ? formData.shipping.email : "-" }}
        </div>

        <div>
          <label for="class">Address: &nbsp;</label>
          {{ formData.shipping.address1 ? formData.shipping.address1 : "-" }}
          {{ formData.shipping.address2 ? formData.shipping.address2 : "-" }}
        </div>

        <div>
          <label for="City">City: &nbsp;</label>
          {{ formData.shipping.city ? formData.shipping.city : "-" }}
        </div>

        <div>
          <label for="Postcode">Postcode: &nbsp;</label>
          {{ formData.shipping.postcode ? formData.shipping.postcode : "-" }}
        </div>
      </div>

      <!-- Display payment details-->
      <div class="p-field p-col">
        <div>
          <h3>Payment Details</h3>
          <label for="Name">Cardholder Name: &nbsp;</label>

          {{ formData.cardholder.name ? formData.cardholder.name : "-" }}
        </div>
        <div>
          <label for="Number"> Number: &nbsp;</label>

          {{ formData.cardholder.number ? formData.cardholder.number : "-" }}
        </div>
        <div>
          <label for="Date">Exp Date: &nbsp;</label>
          {{ formData.cardholder.date ? formData.cardholder.date : "-" }}
        </div>
        <div>
          <label for="CVV">CVV: &nbsp;</label>
          {{
            formData.cardholder.cvv && formData.cardholder.cvv.length === 3
              ? "**" + formData.cardholder.cvv[2]
              : "-"
          }}
        </div>
      </div>
    </div>
    <div style="margin-left: 30px;">
      <!-- Display order detais-->
      <h3>Order Details</h3>
      <div class="p-grid">
        <div class="p-field p-col">
          <b>Name</b>
          <!-- For products in basket, diplay the title,quantity and price of each-->
          <div v-for="product in basket" :key="product">
            <p>{{ product.title }}</p>
          </div>
        </div>
        <div class="p-field p-col">
          <b>Quantity</b>
          <div v-for="product in basket" :key="product">
            <p>{{ product.quantity }}</p>
          </div>
        </div>
        <div class="p-field p-col">
          <b>Price</b>

          <div v-for="product in basket" :key="product">
            <p>{{ product.price }}</p>
          </div>
          <label for="Shipping"> Shipping: 3.50 &nbsp;</label>
          <br />
          <label for="Total">Total: &nbsp;</label>
          <!-- Display total price-->
          <b>{{ basket.overAllTotal }}</b>
        </div>
      </div>
    </div>
    <div class="p-grid p-nogutter p-justify-between">
      <!-- Nav buttons for checkout steps-->
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
      <Button
        label="Complete"
        @click="complete()"
        icon="pi pi-check"
        iconPos="right"
        class="p-button-success"
      />
    </div>
  </div>
</template>

<script>
//imports
import Button from "primevue/button";
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
export default {
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
      confirmed: true,
    };
  },
  components: {
    Button,
  },
  //formData is used as the main object
  props: {
    formData: Object,
  },
  methods: {
    //nav buttons
    prevPage() {
      this.$emit("prev-page", { pageIndex: 2 });
    },
    complete() {
      this.$emit("complete");
    },
  },
};
</script>
<style scoped></style>
