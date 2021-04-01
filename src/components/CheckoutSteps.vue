<template>
  <div class="content-container">
    <div>
      <div>
        <Steps :model="items" :readonly="true" />
      </div>

      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
        @complete="complete"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
  <div class="modal-backdrop" v-if="loading">
    <progress-spinner />
  </div>

  <Dialog
    class="success-box"
    header="Your order is in the bag!"
    v-model:visible.sync="success"
    :modal="true"
    @hide="returnHome"
  >
    <div>
      Thank you for choosing Hot Sauce Co! We take pride in our work to deliver
      you the best hot sauce products in the UK! You can check your emails for
      an order confirmation!
    </div>
    <template #footer>
      <h1>Your order number is : {{ orderNum }}</h1>
      <h1> Check your email for confirmation! </h1>
      <Button label="Return to home" @click="returnHome()"> </Button>
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/button";
import emailjs from "emailjs-com";

import Dialog from "primevue/dialog";
import { pushOrder, updateStock, fetchOrderNum } from "@/firebase/database";
import Steps from "primevue/steps";
import { inject } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import { BasketSymbol } from "../constants/symbols";

export default {
  setup() {
    const basket = inject(BasketSymbol);
    return {
      basket,
    };
  },
  data() {
    return {
      success: false,
      orderNum: "",
      loading: false,
      items: [
        {
          label: "Shipping Details",
          to: "/checkout/shipping",
        },
        {
          label: "Payment",
          to: "/checkout/payment",
        },
        {
          label: "Confirmation",
          to: "/checkout/confirmation",
        },
      ],
      formObject: {},
    };
  },
  components: {
    Steps,
    Button,
    ProgressSpinner,
    Dialog,
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    async complete() {
      await pushOrder({ ...this.formObject });
      //await function for
      var number = this.formObject.cardholder.number;
      this.loading = true;
      debugger
      await updateStock(this.basket);
      this.basket = [];
      const query = await fetchOrderNum(number);
      this.orderNum = query[0];
      var templateParams = 
          {firstName: this.formObject.shipping.firstName,
        orderNum: this.orderNum,
        email: this.formObject.shipping.email} 
      emailjs.send("service_4mm1o39", "template_t51uwdn", templateParams,  "user_22cA2roX3Hww6r8FEvwl2");

      setTimeout(this.orderSuccess, 3000);
    },
    orderSuccess() {
      this.loading = false;
      this.success = true;
    },
    returnHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
