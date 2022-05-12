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
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="input_wrapper">
        <input type="text" placeholder="tag" v-model="tag" />
        <button v-on:click="addTagHandler">add tag</button>
      </div>

      <div class="input_wrapper">
        <input type="text" placeholder="city" v-model="city" />
        <button v-on:click="addCityHandler">add city</button>
      </div>

      <div class="input_wrapper">
        <input type="text" placeholder="region" v-model="region" />
        <button v-on:click="addRegionHandler">add region</button>
      </div>

      <div class="input_wrapper">
        <input type="text" placeholder="category" v-model="category" />
        <button v-on:click="addCategoryHandler">add category</button>
      </div>
    </div>
    <div class="result">
      <div class="list">
        <span class="title">tags</span>
        <div class="prop_list">
          <div class="item" v-for="tag in tag_list" v-bind:key="tag.id">
            <span> {{ tag.name }} </span>
          </div>
        </div>
      </div>

      <div class="list">
        <span class="title">cities</span>
        <div class="prop_list">
          <div class="item" v-for="city in city_list" v-bind:key="city.id">
            <span> {{ city.name }} </span>
          </div>
        </div>
      </div>

      <div class="list">
        <span class="title">regions</span>
        <div class="prop_list">
          <div
            class="item"
            v-for="region in region_list"
            v-bind:key="region.id"
          >
            <span> {{ region.name }} </span>
          </div>
        </div>
      </div>

      <div class="list">
        <span class="title">categories</span>
        <div class="prop_list">
          <div
            class="item"
            v-for="category in category_list"
            v-bind:key="category.id"
          >
            <span> {{ category.name }} </span>
          </div>
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
  height: 70%;
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
</style>
