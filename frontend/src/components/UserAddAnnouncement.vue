<script lang="ts">
import { defineComponent } from "vue";
import { getOwnAnnouncements } from "../http_api";
import type { IAnnouncement } from "common";

interface Data {
  description: string;
  price: number;
  city: string;
  region: string;
  images: string;
  tags: string;
  categories: string;
}

export default defineComponent({
  name: "UserAddAnnouncements",
  data: function () {
    const dt: Data = {
      description: "",
      price: 0,
      city: "",
      region: "",
      images: "",
      tags: "",
      categories: "",
    };
    return dt;
  },
  methods: {
    async addAnnouncement() {
      console.log("click on item with id");
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div>
      <p class="title">Add announcement</p>

      <div class="add_announcement_wrapper">
        <input type="text" placeholder="email" />
        <input type="text" placeholder="last_name" />
        <input type="text" placeholder="name" />
        <input type="text" placeholder="password" />
        <input type="text" placeholder="phone_number" />
        <button v-on:click="addAnnouncement">add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 0.8;
}

.add_announcement_wrapper {
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
}
</style>
