<script lang="ts">
import { defineComponent } from "vue";
import { getOwnAnnouncements } from "../http_api";
import type { IAnnouncement } from "common";

interface Data {
  announcements: IAnnouncement[];
}

export default defineComponent({
  name: "UserAnnouncements",
  data: function () {
    const dt: Data = {
      announcements: [],
    };
    return dt;
  },
  created() {
    getOwnAnnouncements()
      .then((res) => {
        this.announcements = res.data;
      })
      .catch((error) => {
        console.log("getOwnAnnouncements error", error);
      });
  },
  methods: {
    async onItemClick(ann: IAnnouncement) {
      console.log("click on item with id", ann.id);
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div>
      <p class="title">My announcements</p>
      <div
        class="item"
        v-for="ann in announcements"
        v-bind:key="ann.id"
        v-on:click="onItemClick(ann)"
      >
        <span> description: {{ ann.description }} </span>
        <span> price: {{ ann.price }} </span>
        <span> ({{ ann.region }} / {{ ann.city }} ) </span>
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
.item {
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
}
.title {
  font-size: 24px;
}
</style>
