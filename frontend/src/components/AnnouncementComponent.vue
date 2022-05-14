<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: [
    "categories",
    "city",
    "description",
    "id",
    "images",
    "price",
    "region",
    "tags",
  ],
  data() {
    return {
      ...this.$props,
    };
  },
});
</script>

<template>
  <div class="announcement">
    <div>
      {{ $props.description }}
      <p>description: {{ description }}</p>
      <p>price: {{ price }}</p>
      <p>({{ region }} / {{ city }} )</p>

      <br />
      categories:
      <div>
        <span v-for="cat in categories" v-bind:key="cat.id">{{
          cat.name
        }}</span>
      </div>

      <br />
      tags:
      <div>
        <span v-for="tag in tags" v-bind:key="tag.id">{{ tag.name }}</span>
      </div>

      <div>
        <img
          v-for="img in images"
          v-bind:key="img.id"
          v-bind:src="img.url"
          width="300"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.announcement {
  display: flex;
  flex-direction: row;
  flex-grow: 0.2;
  justify-content: flex-start;
  border: 1px solid white;
  padding: 6px;
  margin: 5px 0 5px 0;
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
