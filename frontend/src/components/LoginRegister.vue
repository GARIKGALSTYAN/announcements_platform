<script lang="ts">
import router from "@/router";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav-k",
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
      axios
        .post(import.meta.env.VITE_APP_API_URL + "/user/login", this.login)
        .then((log_res) => {
          const { refresh_token, access_token, access_token_expiry_date } =
            log_res.data;
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem(
            "access_token_expiry_date",
            access_token_expiry_date
          );
          router.push({ path: "/profile" });
        })
        .catch((err) => {
          console.log("logerr: ", err);
        });
    },
    doRegister() {
      console.log("doRegister: ", this.register);
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
  width: 80%;
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
