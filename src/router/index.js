import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/Auth.vue"),
    redirect: {
        name: 'login'
    },
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "registration",
        name: "registration",
        component: () => import("../views/Registration.vue"),
      },
    //   esta bien que esta riuta sea un children?
      {
        path: "checkemail",
        name: "checkemail",
        component: () => import("../views/CheckEmail.vue")
      }
    ],
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
