<script lang="ts">
import { defineComponent } from "vue";
import { getOwnAnnouncements } from "../http_api";
import type { Announcement } from "common";

interface Data {
  announcements: Announcement.IAnnouncement[];
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
        console.log("Get own announcements error", error);
      });
  },
});
</script>

<template>
  <div class="wrapper">
    <div>
      <p class="title">My announcements</p>
      <div class="item" v-for="ann in announcements" v-bind:key="ann.id">
        <p>description: {{ ann.description }}</p>
        <p>price: {{ ann.price }}</p>
        <p>({{ ann.region }} / {{ ann.city }} )</p>
        <div>
          <span v-for="cat in ann.categories" v-bind:key="cat.id">{{
            cat.name
          }}</span>
        </div>

        <div>
          <span v-for="tag in ann.tags" v-bind:key="tag.id">{{
            tag.name
          }}</span>
        </div>

        <div>
          <img
            v-for="img in ann.images"
            v-bind:key="img.id"
            v-bind:src="img.url"
            width="300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 0.2;
  justify-content: center;
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
