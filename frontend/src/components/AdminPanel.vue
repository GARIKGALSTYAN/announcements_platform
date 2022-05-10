<script lang="ts">
import { defineComponent } from "vue";
import {
  addCategory,
  addCity,
  addRegion,
  addTag,
  getCities,
  getRegions,
  getTags,
  getCategories,
} from "../http_api";
import type { ICategory, ICity, IRegion, ITag } from "common";

interface Data {
  tag: string;
  city: string;
  region: string;
  category: string;

  tag_list: ITag[];
  city_list: ICity[];
  region_list: IRegion[];
  category_list: ICategory[];
}

export default defineComponent({
  name: "AdminPanel",
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
    addCategoryHandler() {
      console.log("addCategoryHandler: ", this.category);

      addCategory({
        name: this.category,
      })
        .then(() => {
          this.category = "";
          this.refetch();
        })
        .catch((error) => {
          console.log("addCategory error", error);
        });
    },
    addCityHandler() {
      console.log("addCityHandler: ", this.city);

      addCity({
        name: this.city,
      })
        .then(() => {
          this.city = "";
          this.refetch();
        })
        .catch((error) => {
          console.log("addCity error", error);
        });
    },
    addRegionHandler() {
      console.log("addRegionHandler: ", this.region);

      addRegion({
        name: this.region,
      })
        .then(() => {
          this.region = "";
          this.refetch();
        })
        .catch((error) => {
          console.log("addRegion error", error);
        });
    },
    addTagHandler() {
      console.log("addTagHandler: ", this.tag);

      addTag({
        name: this.tag,
      })
        .then(() => {
          this.tag = "";
          this.refetch();
        })
        .catch((error) => {
          console.log("addTag error", error);
        });
    },
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
      console.log("refetch call");
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="input_wrapper">
        <input type="text" placeholder="tag" v-model="tag" />
        <button v-on:click="addTagHandler">add</button>
      </div>

      <div class="input_wrapper">
        <input type="text" placeholder="city" v-model="city" />
        <button v-on:click="addCityHandler">add</button>
      </div>

      <div class="input_wrapper">
        <input type="text" placeholder="region" v-model="region" />
        <button v-on:click="addRegionHandler">add</button>
      </div>

      <div class="input_wrapper">
        <input type="text" placeholder="category" v-model="category" />
        <button v-on:click="addCategoryHandler">add</button>
      </div>
    </div>
    <div class="result">
      <div class="prop_list">
        <span>tag</span>
        <div class="item" v-for="tag in tag_list" v-bind:key="tag.id">
          <span> {{ tag.name }} </span>
        </div>
      </div>

      <div class="prop_list">
        <span>city</span>
        <div class="item" v-for="city in city_list" v-bind:key="city.id">
          <span> {{ city.name }} </span>
        </div>
      </div>

      <div class="prop_list">
        <span>region</span>
        <div class="item" v-for="region in region_list" v-bind:key="region.id">
          <span> {{ region.name }} </span>
        </div>
      </div>

      <div class="prop_list">
        <span>category</span>
        <div
          class="item" v-for="category in category_list"
          v-bind:key="category.id"
        >
          <span> {{ category.name }} </span>
        </div>
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

.sidebar {
  flex-grow: 0.2;
  background-color: red;
}

.result {
  flex-grow: 0.8;
  background-color: blue;
  display: flex;
  flex-direction: row;
}

.input_wrapper {
  display: flex;
  flex-direction: row;
}

.prop_list {
  display: flex;
  flex-direction: column;
}
</style>
