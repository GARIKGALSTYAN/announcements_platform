<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { loginRequest, registerRequest } from "../http_api";
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

          this.login.email = "";
          this.login.password = "";
        })
        .catch((error) => {
          console.log("Login error: ", error);
        });
    },
    doRegister() {
      registerRequest({
        email: this.register.email,
        last_name: this.register.last_name,
        name: this.register.name,
        password: this.register.password,
        phone_number: this.register.phone_number,
      })
        .then(() => {
          alert("You successfully registered");

          this.register.email = "";
          this.register.last_name = "";
          this.register.name = "";
          this.register.password = "";
          this.register.phone_number = "";
        })
        .catch((error) => {
          console.log("Register error: ", error);
        });
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="login_wrapper side">
      <input type="text" placeholder="email" v-model="login.email" />
      <input type="text" placeholder="password" v-model="login.password" />
      <button v-on:click="doLogin">login</button>
    </div>
    <div class="register_wrapper side">
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
  margin: 0 10% 0 10%;
  justify-content: space-around;
}

input {
  margin: 10px;
  height: 25px;
  width: 65%;
  font-size: 20px;
}

button {
  margin: 10px;
  padding: 5px 0 5px 0;
  width: 65%;
  font-size: 20px;
}

.side {
  border: 1px solid white;
  border-radius: 5px;
  flex-grow: 0.2;
  padding: 1% 10% 1% 10%;
  display: flex;
  flex-direction: column;
  min-height: 60%;
  justify-content: center;
  align-items: center;
}
</style>
