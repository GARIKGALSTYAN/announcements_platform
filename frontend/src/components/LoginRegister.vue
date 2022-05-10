<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { loginRequest } from "../http_api";
import { saveTokens } from "../utils";

export default defineComponent({
  name: "LoginRegister",
  data: function () {
    return {
      login: {
        email: "garik@test.com",
        password: "123456789",
      },
      register: {
        email: "",
        last_name: "",
        name: "",
        password: "",
        phone_number: "",
      },
    };
  },
  methods: {
    async doLogin() {
      loginRequest({
        email: this.login.email,
        password: this.login.password,
      })
        .then((result) => {
          saveTokens(result.data);
          router.push({ path: "/profile" });
        })
        .catch((error) => {
          console.log("Login error: ", error);
        });
    },
    doRegister() {
      console.log("doRegister:(implement) ", this.register);
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="login_wrapper">
      <input type="text" placeholder="email" v-model="login.email" />
      <input type="text" placeholder="password" v-model="login.password" />
      <button v-on:click="doLogin">login</button>
    </div>
    <div class="register_wrapper">
      <input type="text" placeholder="email" v-model="register.email" />
      <input type="text" placeholder="last_name" v-model="register.last_name" />
      <input type="text" placeholder="name" v-model="register.name" />
      <input type="text" placeholder="password" v-model="register.password" />
      <input
        type="text"
        placeholder="phone_number"
        v-model="register.phone_number"
      />
      <button v-on:click="doRegister">register</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 0.8;
}

.register_wrapper {
  flex-grow: 0.5;
  background-color: red;
}

.login_wrapper {
  flex-grow: 0.5;
  background-color: blue;
}
</style>
