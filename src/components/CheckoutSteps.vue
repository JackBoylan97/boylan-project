<template>
  <div class="content-container">
    <h1 style="text-align: center;">Checkout</h1>
    <div>
      <div>
        <Steps :model="items" :readonly="true" />
      </div>
      <!-- Router views used for  linking different components for checkout steps-->
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
  <!-- Addition of loading symbol/ display if loading is true
  -->
  <div class="modal-backdrop" v-if="loading">
    <progress-spinner />
  </div>
  <!--Display dialog if success is true -->
  <Dialog
    class="success-box"
    style="width: 50vw;"
    v-model:visible.sync="success"
    :modal="true"
    closable="false"
    @hide="returnHome"
  >
    <template #header>
      <p style="font-size: 3.5vw;">Your order is in the bag!</p>
    </template>
    <p style="font-size: 1.5vw;">
      Thank you for choosing Hot Sauce Co! We take pride in our work to deliver
      you the best hot sauce products in the UK! You can check your emails for
      an order confirmation!
    </p>
    <img :src="`../Winking.jpg`" class="image" modal="true" />
    <br />
    <div style="text-align: center;">
      <p style="font-size: 1.9vw;">Your order number is :</p>
      <p style="font-size: 3vw;">{{ orderNum }}</p>
    </div>
    <!-- Return home-->
    <Button label="Return to home" @click="returnHome()"> </Button>
  </Dialog>
</template>

<script>
import Button from "primevue/button";
//Importing emailjs plugin, used for sending emails
import emailjs from "emailjs-com";

import Dialog from "primevue/dialog";
//Grabbing methods from database file
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
    //Events used to populate formData and to trigger next page/router
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    //Using async method to await for formObject response
    async complete() {
      //Push order to order collection
      await pushOrder({ ...this.formObject });
      //Set number which will be used to fetch order details
      var number = this.formObject.cardholder.number;
      //set loading spinner to true
      this.loading = true;
      //Update stock on database
      await updateStock(this.basket);
      //Empty the basket
      this.basket = [];
      //Fetch the order number via users card number
      const query = await fetchOrderNum(number);
      //set ordernum
      this.orderNum = query[0];
      //Email JS method, sends email to user via users email
      var templateParams = {
        firstName: this.formObject.shipping.firstName,
        orderNum: this.orderNum,
        email: this.formObject.shipping.email,
      };
      //emailJS details
      emailjs.send(
        "service_4mm1o39",
        "template_t51uwdn",
        templateParams,
        "user_22cA2roX3Hww6r8FEvwl2"
      );
      //set timeout used, gives the loading spinner 3seconds loading time
      setTimeout(this.orderSuccess, 3000);
    },

    orderSuccess() {
      //set loading spinner to false
      this.loading = false;
      //display success box
      this.success = true;
    },
    returnHome() {
      //return user to Home page
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style>
/* Set modal stying */
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
