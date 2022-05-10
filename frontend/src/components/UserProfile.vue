<script lang="ts">
// import
import router from "@/router";
import axios from "axios";
import { defineComponent } from "vue";
import { requestWithAuth } from "../utils/requestWithAuth";

export default defineComponent({
  name: "Profile-k",
  data: function () {
    return {
      announcements: [],
    };
  },
  created() {
    console.log('prolfe create call');
    requestWithAuth({
      metod: "GET",
      path: "/my_announcement",
    })
      .then((res) => {
        console.log("my aaanc res: ", res);
        // eslint-disable-next-line
        // @ts-ignore
        this.announcements = res.data;
      })
      .catch((error) => {
        console.log("my aaanc error: ", error)
      });
  },
  methods: {

    async doLogin() {
      //

      // console.log("doLogin: ", this.login);
      // // axios.
      // console.log(
      //   "VUE_APP_API_URL",
      //   import.meta.env.VITE_APP_API_URL,
      //   "/user/login"
      // );

      // axios.post(import.meta.env.VITE_APP_API_URL + "/user/login", this.login)
      //   .then((log_res) => {
      //     console.log('log reg: ', log_res);
      //     const {
      //       refresh_token,
      //       access_token,
      //       access_token_expiry_date,
      //     } = log_res.data;
      //     localStorage.setItem("refresh_token", refresh_token);
      //     localStorage.setItem("access_token", access_token);
      //     localStorage.setItem("access_token_expiry_date", access_token_expiry_date);

      //     router.push({ path: "/profile" });
      //   })
      //   .catch((err) => {
      //     console.log("logerr: ", err);
      //   })
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div>
      <li v-for="ann in announcements">
        {{ ann.id }}
      </li>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  width: 80%;
}
</style>
