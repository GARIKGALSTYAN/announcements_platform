import { createRouter, createWebHistory } from "vue-router";
import LoginRegistration from "../views/LoginRegistration.vue";
import UserProfile from "../views/UserAnnouncements.vue";
import AdminPanel from "@/components/AdminPanel.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: LoginRegistration,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPanel,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
