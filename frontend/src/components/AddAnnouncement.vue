<script lang="ts">
import { defineComponent } from "vue";
import type { Category, City, Region, Tag, Image } from "common";
import {
  getCities,
  getRegions,
  getTags,
  getCategories,
  createAnnouncement,
  uploadImage,
} from "../http_api";

interface Data {
  description: string;
  price: number;

  city: number;
  region: number;

  images: number[];
  tags: number[];
  categories: number[];

  current_selected_category: null | Category.ICategory;
  current_selected_tag: null | Tag.ITag;
  current_selected_city: null | City.ICity;
  current_selected_region: null | Region.IRegion;

  tag_list: Tag.ITag[];
  city_list: City.ICity[];
  region_list: Region.IRegion[];
  category_list: Category.ICategory[];
  image_list: Image.IImage[];
}

export default defineComponent({
  name: "AddAnnouncements",
  data: function () {
    const dt: Data = {
      description: "",
      price: 0,

      city: 0,
      region: 0,

      images: [],
      tags: [],
      categories: [],

      current_selected_category: null,
      current_selected_tag: null,
      current_selected_city: null,
      current_selected_region: null,

      tag_list: [],
      city_list: [],
      region_list: [],
      category_list: [],
      image_list: [],
    };
    return dt;
  },
  created() {
    this.fetchLists();
  },
  computed: {
    selectedCategories(): string {
      let selected_category_names: string[] = [];

      for (const c_id of this.categories) {
        const c = this.category_list.find((c) => c.id === c_id);
        if (c !== undefined) {
          selected_category_names.push(c.name);
        }
      }

      return selected_category_names.join(",");
    },
    selectedTags(): string {
      let selected_tag_names: string[] = [];

      for (const t_id of this.tags) {
        const t = this.tag_list.find((t) => t.id === t_id);
        if (t !== undefined) {
          selected_tag_names.push(t.name);
        }
      }

      return selected_tag_names.join(",");
    },
    selectedCity(): string {
      let selected_city = "";

      const city = this.city_list.find((c) => c.id === this.city);
      if (city !== undefined) {
        selected_city = city.name;
      }

      return selected_city;
    },
    selectedRegion(): string {
      let selected_region = "";

      const region = this.region_list.find((r) => r.id === this.region);
      if (region !== undefined) {
        selected_region = region.name;
      }

      return selected_region;
    },
  },
  methods: {
    test() {
      const image = this.$refs["image_1"] as HTMLInputElement;

      var reader = new FileReader();
      if (image && image.files) {
        reader.readAsDataURL(image.files[0]);

        reader.onload = () => {
          uploadImage({
            // eslint-disable-next-line
            // @ts-ignore
            image_base_64: reader.result,
          })
            .then((res) => {
              this.image_list.push(res.data);
              this.images.push(res.data.id);
            })
            .catch(() => {
              alert("Error on upload");
            })
            .finally(() => {
              image.value = "";
            });
        };
        reader.onerror = (error) => {
          console.log("Error on image upload", error);
        };
      }
    },
    addAnnouncement() {
      createAnnouncement({
        categories: this.categories,
        city: this.city,
        description: this.description,
        images: this.images,
        price: this.price,
        region: this.region,
        tags: this.tags,
      })
        .then(() => {
          alert("Announcement successfully created");
        })
        .catch((error) => {
          console.log("Error on creating announcement", error);
          alert("Error occurred");
        });
    },
    addCategory() {
      if (this.current_selected_category !== null) {
        this.categories.push(this.current_selected_category.id);
        this.current_selected_category = null;
      }
    },
    addTag() {
      if (this.current_selected_tag !== null) {
        this.tags.push(this.current_selected_tag.id);
        this.current_selected_tag = null;
      }
    },
    setCity() {
      if (this.current_selected_city !== null) {
        this.city = this.current_selected_city.id;
        this.current_selected_city = null;
      }
    },
    setRegion() {
      if (this.current_selected_region !== null) {
        this.region = this.current_selected_region.id;
        this.current_selected_region = null;
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
    },
  },
});
</script>

<template>
  <div class="wrapper">
    <div>
      <p class="title">Add announcement</p>

      <div class="add_announcement_wrapper">
        <p title="6mb because of cloudinary.com free package :D">
          *All fields are MUST and image size must be lower or equal to 6mb
        </p>

        <input type="text" placeholder="description" v-model="description" />
        <input type="number" placeholder="price" v-model="price" />

        <div id="selector_category">
          <select
            v-model="current_selected_category"
            v-on:change="addCategory()"
          >
            <option
              v-for="category in category_list"
              :value="category"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span>Selected categories: {{ selectedCategories }}</span>
        </div>

        <div id="selector_tag">
          <select v-model="current_selected_tag" v-on:change="addTag()">
            <option v-for="tag in tag_list" :value="tag" :key="tag.id">
              {{ tag.name }}
            </option>
          </select>
          <span>Selected tags: {{ selectedTags }}</span>
        </div>

        <div id="selector_city">
          <select v-model="current_selected_city" v-on:change="setCity()">
            <option v-for="city in city_list" :value="city" :key="city.id">
              {{ city.name }}
            </option>
          </select>
          <span>Selected city: {{ selectedCity }}</span>
        </div>

        <div id="selector_region">
          <select v-model="current_selected_region" v-on:change="setRegion()">
            <option
              v-for="region in region_list"
              :value="region"
              :key="region.id"
            >
              {{ region.name }}
            </option>
          </select>
          <span>Selected region: {{ selectedRegion }}</span>
        </div>

        <div id="selector_image">
          <img
            v-for="image in image_list"
            :key="image.id"
            v-bind:src="image.url"
            width="300"
          />
        </div>

        <!-- <cld-image public-id="mypic" /> -->

        <input type="file" ref="image_1" v-on:change="test" />

        <button v-on:click="addAnnouncement">add</button>
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

* {
  margin: 5px;
}

.add_announcement_wrapper {
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
  display: flex;
  flex-direction: column;
}
</style>
