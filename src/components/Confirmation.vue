<template>
  <div class="stepsdemo-content">
    <Card class="details">
      <template #title>
        <h1>Confirmation</h1>
        
<Divider/>
      </template>
      <template #content>
        <div class="shipping-details">
          <h3>Shipping details</h3>
          <div class="p-field p-col-12">
            <label for="class">Name</label>
            <b
              >{{
                formData.shipping.firstName ? formData.shipping.firstName : "-"
              }}
              {{
                formData.shipping.lastName ? formData.shipping.lastName : "-"
              }}</b
            >
          </div>
          <div class="p-field p-col-12">
            <label for="Telephone">Telephone</label>
            <b>{{
              formData.shipping.telephone ? formData.shipping.telephone : "-"
            }}</b>
          </div>
          <div class="p-field p-col-12">
            <label for="Email">Email</label>
            <b>{{ formData.shipping.email ? formData.shipping.email : "-" }}</b>
          </div>
          <div class="p-field p-col-12">
            <label for="class">Address</label>
            <b>{{
                formData.shipping.address1 ? formData.shipping.address1 : "-"
              }}
              {{
                formData.shipping.address2 ? formData.shipping.address2 : "-"
              }}</b>
          </div>
          <div class="p-field p-col-12">
            <label for="City">City</label>
            <b>{{ formData.shipping.city ? formData.shipping.city : "-" }}</b>
          </div>
          <div class="p-field p-col-12">
            <label for="Postcode">Postcode</label>
            <b>{{
              formData.shipping.postcode ? formData.shipping.postcode : "-"
            }}</b>
          </div>
        </div>

<Divider layout="vertical"/>

        <div class="payment-details">
          <h3> Payment Details</h3>
          <div class="p-field p-col-12">
            <label for="Name">Cardholder Name</label>
            <b>{{
              formData.cardholder.name ? formData.cardholder.name : "-"
            }}</b>
          </div>
          <div class="p-field p-col-12">
            <label for="Number"> Number</label>
            <b>
              {{
                formData.cardholder.number ? formData.cardholder.number : "-"
              }}
            </b>
          </div>
          <div class="p-field p-col-12">
            <label for="Date">Date</label>
            <b>{{
              formData.cardholder.date ? formData.cardholder.date : "-"
            }}</b>
          </div>
          <div class="p-field p-col-12">
            <label for="CVV">CVV</label>
            <b>{{
              formData.cardholder.cvv && formData.cardholder.cvv.length === 3
                ? "**" + formData.cardholder.cvv[2]
                : "-"
            }}</b>
          </div>
        </div>
<h3> Order Details</h3>
<!--<div class="OrderQuantity">
  <label for="Quantity"> Quantity</label>
  <b>{{}}</b>

</div>
-->
<div class="order total">
  <label for="Total">Total</label>
  <b>{{basket.overAllTotal}}</b>
</div>
      </template>
      <template #footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="Complete"
            @click="complete()"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { inject } from "vue";
import { BasketSymbol } from "../constants/symbols";
export default {
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
    };
  },
  components: {
    Card,
    Divider,
    Button
  },
  props: {
    formData: Object,
  },
  methods: {
    prevPage() {
      this.$emit("prev-page", { pageIndex: 3 });
    },
    complete() {
      this.$emit("complete");

    },
  },
};
</script>
<style scoped>
.details{
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>