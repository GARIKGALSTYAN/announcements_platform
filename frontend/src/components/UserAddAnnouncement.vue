<script lang="ts">
import { defineComponent } from "vue";
import { getOwnAnnouncements } from "../http_api";
import type { IAnnouncement } from "common";
import type { ICategory, ICity, IRegion, ITag } from "common";
import {
  getCities,
  getRegions,
  getTags,
  getCategories,
} from "../http_api";

interface Data {
  description: string;
  price: number;
  city: string;
  region: string;
  images: string;
  tags: string;
  selected_category: null | ICategory;
  selected_categories: ICategory[];

  tag_list: ITag[];
  city_list: ICity[];
  region_list: IRegion[];
  category_list: ICategory[];
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

      selected_category: null,
      selected_categories: [],

      tag_list: [],
      city_list: [],
      region_list: [],
      category_list: [],
    };
    return dt;
  },
  created() {
    console.log('aaaaaaaaaaa')
    this.fetchLists();
  },
  computed: {
    // a computed getter
    selectedCagts(): string {
      // `this` points to the component instance
      return this.selected_categories.map((c) => c.name).join(", ");
      // selected_categories.map((c) => c.name).join(", ");
    }
  },
  methods: {
    addAnnouncement() {
      console.log("click on item with id");
    },
    addCategory() {
      console.log("addCategory aa: ", this.selected_category);
      if (this.selected_category !== null) {
        this.selected_categories.push(this.selected_category);
        this.selected_category = null;
      }
    },
    fetchLists() {
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
    <div>
      <p class="title">Add announcement</p>

      <div class="add_announcement_wrapper">
        <input type="text" placeholder="email" />
        <input type="text" placeholder="last_name" />
        <input type="text" placeholder="name" />
        <input type="text" placeholder="password" />
        <input type="text" placeholder="phone_number" />

        <span> sle-ed cats:  {{ selectedCagts }} </span>

        <!-- <div id="selector">
          <select>
            <option v-for="city in city_list" :value="city.id" :key="city.id">
              {{ city.name }}
            </option>
          </select>
          <span>Selected: {{ selected_category }}</span>
        </div> -->

        <div id="selector_1">
          <select v-model="selected_category" v-on:change="addCategory()">
            <option
              v-for="category in category_list"
              :value="category"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span>Selected: {{ 5 }}</span>
        </div>


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






<!-- <template>
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
 -->
