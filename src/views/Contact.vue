<template>
  <div class="content-container">
    <div class="contact-title">
      <h1>Have a question? Contact us!</h1>
    </div>
    <div class="contact">
      <div class="jumbotron text-left">
        <div class="container">
          <h3>Contact Form</h3>
          <form v-on:submit="sendForm">
            <label for="fname">First Name</label>
            <input
              type="text"
              v-model="submission.firstName"
              name="firstname"
              placeholder="Your name.."
            />

            <label for="lname">Last Name</label>
            <input
              type="text"
              v-model="submission.lastName"
              name="lastname"
              placeholder="Your last name.."
            />
            <label for="email">Email</label>
            <input
              type="text"
              v-model="submission.email"
              name="email"
              placeholder="Your email.."
            />

            <label for="subject">Subject</label>
            <textarea
              name="subject"
              v-model="submission.subject"
              placeholder="Write something.."
              style="height:200px"
            ></textarea>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import { customerForm } from "@/firebase/database";
import Toast from "primevue/toast";
// @ is an alias to /src
export default {
  data() {
    return {
      submission: {
        firstName: "",
        lastName: "",
        subject: "",
        email: "",
      },
    };
  },
  name: "Contact",
  components: {
    Toast,
  },
  methods: {
    async sendForm() {
      
      await customerForm({ ...this.submission });
      this.$toast.add({
        severity: "success",
        life: 3000,
        summary: "Success",
        detail: "Your query has been sent, we shall get in touch soon!",
      });
    },
  },
};
</script>

<style scoped>
.jumbotron {
  background-color: #ffffff;
  color: #fff;
  padding: 10px 2px;
  font-family: Montserrat, sans-serif;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
* {
  box-sizing: border-box;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #5f75f1;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #160d4d;
}

.container {
  width: 500px;
  border-radius: 5px;
  border-color: black;
  border-style: solid;
  color: black;
  background-color: #e32636;
  padding: 20px;
}
</style>
