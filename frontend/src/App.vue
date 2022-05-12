<script setup lang="ts">
import { RouterView } from "vue-router";
import HomePage from "./components/HomePage.vue";
</script>

<template>
  <HomePage />
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
body {
  display: flex;
  place-items: center;
  font-size: 20px;
}
#app {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  justify-content: space-around;
  font-weight: normal;
}
</style>
