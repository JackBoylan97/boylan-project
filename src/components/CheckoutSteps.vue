<template>
  <div class="layout-content">
    <Toast />
    <div >
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
</template>

<script>
import Toast from "primevue/toast";
import Steps from "primevue/steps";
export default {
  data() {
    return {
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
    Toast,
    Steps,
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
    complete() {
      this.$toast.add({
        severity: "success",
        summary: "Order submitted",
        detail:
          "Dear, " +
          this.formObject.firstname +
          " " +
          this.formObject.lastname +
          " your order completed.",
      });
    },
  },
};
</script>
