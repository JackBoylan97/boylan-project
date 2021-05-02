<template>
  <div class="content-container">
    <!-- Uses of primvue classes for grid  
    
    Using Prime Vue it enables a lot simpler formats for editing 
    flex boxes
    

    -->

    <div class="p-fluid p-formgrid p-grid" style="justify-content: center;">
      <!-- Setting fields and columns-->
      <div class="p-field p-col p-md-3">
        <label for="firstname">Firstname</label>
        <InputText
          :class="{ 'p-invalid': validationErrors.firstName && submitted }"
          id="firstname"
          type="text"
          class="p-inputtext-lg"
          pattern="[A-Za-z]{3}"
          v-model="shipping.firstName"
        />
        <br />

        <!-- validation-->
        <small v-show="validationErrors.firstName && submitted" class="p-error">
          Firstname is required.</small
        >
        <br />
        <label for="telephone">Telephone</label>
        <InputText
          id="telephone"
          type="text"
          placeholder="07"
          :class="{ 'p-invalid': validationErrors.telephone && submitted }"
          class="p-inputtext-lg p-md-2"
          v-model="shipping.telephone"
        />
        <br />
        <!-- validation-->
        <small v-show="validationErrors.telephone && submitted" class="p-error">
          Invalid mobile(11 Digits)
        </small>

        <br />
        <label for="address">Address Line 1</label>
        <InputText
          id="address1"
          rows="1"
          :class="{ 'p-invalid': validationErrors.address && submitted }"
          v-model="shipping.address"
          class="p-inputtext-lg"
        />
        <br />
        <!-- validation-->
        <small v-show="validationErrors.address && submitted" class="p-error"
          >Address is required
        </small>
        <br />

        <label for="city">City</label>
        <InputText
          :class="{ 'p-invalid': validationErrors.city && submitted }"
          id="city"
          type="text"
          v-model="shipping.city"
          class="p-inputtext-lg"
        />
        <br />
        <!-- validation-->
        <small v-show="validationErrors.city && submitted" class="p-error"
          >City is required
        </small>
        <br />
      </div>

      <div class="p-field p-col p-md-3">
        <label for="lastname6">Lastname</label>
        <InputText
          :class="{ 'p-invalid': validationErrors.lastName && submitted }"
          id="last-name"
          type="text"
          class="p-inputtext-lg"
          v-model="shipping.lastName"
        />
        <br />
        <!-- validation-->
        <small v-show="validationErrors.firstName && submitted" class="p-error"
          >Lastname is required
        </small>
        <br />

        <label for="email"> Email</label>
        <InputText
          :class="{ 'p-invalid': validationErrors.email && submitted }"
          id="email"
          class="p-inputtext-lg"
          v-model="shipping.email"
        />
        <br />
        <!-- validation-->
        <small v-show="validationErrors.email && submitted" class="p-error"
          >Email is required
        </small>
        <!-- validation-->
        <small v-show="validationErrors.emailFormat" class="p-error">
          -Invalid Email Format</small
        >

        <br />
        <label for="address">Address Line 2</label>
        <InputText
          id="address2"
          rows="1"
          v-model="address2"
          class="p-inputtext-lg"
        />
        <br />
        <br />
        <label for="address">Postcode</label>
        <InputText
          id="postcode"
          rows="1"
          :class="{ 'p-invalid': validationErrors.postcode && submitted }"
          v-model="shipping.postcode"
          class="p-inputtext-lg p-md-1"
        />
        <!-- validation-->
        <small v-show="validationErrors.postcode" class="p-error">
          Postcode is required</small
        >
      </div>
    </div>

    <Button
      label="Next"
      @click="nextPage()"
      icon="pi pi-angle-right"
      iconPos="right"
    />
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
  data() {
    return {
      address2: "",
      submitted: false,
      validationErrors: {},
      shipping: {
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
        address: "",
        city: "",
        postcode: "",
      },
    };
  },
  computed: {
    //Return emailValid to value of this.shipping.email
    emailValid() {
      return this.shipping.email;
    },
  },
  watch: {
    emailValid(newValue) {
      //regex used for email
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //Check if email passes  `re`
      if (!re.test(newValue)) {
        //if it fails then set validation.emailFormat to true
        this.validationErrors["emailFormat"] = true;
      } else delete this.validationErrors["emailFormat"];
    },
  },
  methods: {
    nextPage() {
      this.submitted = true;
      debugger;
      /* Since address2 is optional, check if its empty and if so
      remove from object */
      if (!this.address2 == "") {
        this.shipping.address2 = this.address2;
      }
      // If Validation is passed
      if (this.validateForm()) {
        this.$emit(
          "next-page",
          //send data to formData via Emit (pass data to parent method)
          {
            formData: { shipping: this.shipping },
            pageIndex: 0,
          }
        );
      }
    },
    //VALIDATION
    validateForm() {
      if (!this.shipping.firstName.trim())
        this.validationErrors["firstName"] = true;
      else delete this.validationErrors["firstName"];

      if (!this.shipping.lastName.trim())
        this.validationErrors["lastName"] = true;
      else delete this.validationErrors["lastName"];

      if (!this.shipping.telephone.trim())
        this.validationErrors["telephone"] = true;
      else if (!/^\d{11}$/.test(this.shipping.telephone))
        this.validationErrors["telephone"] = true;
      else delete this.validationErrors["telephone"];

      if (!this.shipping.email.trim()) this.validationErrors["email"] = true;
      else delete this.validationErrors["email"];

      if (!this.shipping.address.trim())
        this.validationErrors["address"] = true;
      else delete this.validationErrors["address"];

      if (!this.shipping.city.trim()) this.validationErrors["city"] = true;
      else delete this.validationErrors["city"];

      if (!this.shipping.postcode.trim())
        this.validationErrors["postcode"] = true;
      else delete this.validationErrors["postcode"];
      //return length of validation erors
      return !Object.keys(this.validationErrors).length;
    },
  },
};
</script>
