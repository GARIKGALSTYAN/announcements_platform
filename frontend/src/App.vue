<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
body {
  display: flex;
  place-items: center;
}
#app {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  justify-content: space-around;
  font-weight: normal;
}
</style>
