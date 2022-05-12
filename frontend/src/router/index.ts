import { createRouter, createWebHistory } from "vue-router";
import LoginRegistration from "../views/LoginRegistration.vue";
import UserAddAnnouncement from "@/components/UserAddAnnouncement.vue";
import UserAnnouncements from "@/components/UserAnnouncements.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import HomePage from "@/components/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginRegistration,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserAnnouncements,
    },
    {
      path: "/add",
      name: "add",
      component: UserAddAnnouncement,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPanel,
    },
  ],
});

export default router;
