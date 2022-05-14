<script lang="ts">
import { defineComponent } from "vue";
import { getCities, getRegions, getTags, getCategories } from "../http_api";
import type { Category, City, Region, Tag } from "common";

interface Data {
  tag: string;
  city: string;
  region: string;
  category: string;

  tag_list: Tag.ITag[];
  city_list: City.ICity[];
  region_list: Region.IRegion[];
  category_list: Category.ICategory[];
}

export default defineComponent({
  name: "HomePage",
  data: function () {
    const dt: Data = {
      tag: "",
      city: "",
      region: "",
      category: "",

      tag_list: [],
      city_list: [],
      region_list: [],
      category_list: [],
    };

    return dt;
  },
  created() {
    this.refetch();
  },
  methods: {
    refetch() {
      Promise.all([getCities(), getRegions(), getTags(), getCategories()])
        .then(([ci, rg, tg, ct]) => {
          this.city_list = ci.data;
          this.region_list = rg.data;
          this.tag_list = tg.data;
          this.category_list = ct.data;
        })
        .catch((error) => {
          console.log("Error on refetch", error);
        });
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="links">
      <a href="/login"> Login/Registration </a>
      <a href="/profile"> Profile </a>
      <a href="/add"> Add New </a>
      <a href="/search"> Search </a>
      <a href="/admin"> Admin </a>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  flex-direction: row;
  flex-grow: 0.8;
}

a {
  color: white;
  margin: 10px;
}

.sidebar {
  flex-grow: 0.2;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-right: 3px solid white;
}

.result {
  flex-grow: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 70%;
}

.input_wrapper {
  display: flex;
  flex-direction: row;
}

input {
  margin: 10px;
  height: 40px;
  width: 65%;
  font-size: 20px;
}

button {
  margin: 10px;
  padding: 5px 0 5px 0;
  width: 140px;
  font-size: 20px;
}

.title {
  font-size: 25px;
  border-bottom: 2px solid white;
  margin-bottom: 25px;
}

.prop_list {
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  max-height: 400px;
  overflow: auto;
  padding: 0 40px 0 40px;
}

.list {
  display: flex;
  flex-direction: column;
}

.links {
  margin-top: 30px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
</style>
