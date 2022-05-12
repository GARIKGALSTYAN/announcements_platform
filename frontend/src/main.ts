import { createApp } from 'vue'
import { createPinia } from 'pinia'
// eslint-disable-next-line
// @ts-ignore
// import Cloudinary from "cloudinary-vue";

// const CLOUDUNARY_API_KEY = "GBVV3w-KVKTZmzHf3stYk9WOQOw";


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// "GBVV3w-KVKTZmzHf3stYk9WOQOw"
// app.use(Cloudinary, {
//   configuration: {
//     cloudName: "ds6b98cjz",
//   }
// });

app.mount('#app')
