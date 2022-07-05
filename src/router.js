
import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/",
    name: "home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/welcome",
    alias: "/welcome",
    name: "welcome",
    component: () => import("./views/Welcome.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditTutorial.vue"),
    props: true
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddTutorial.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./views/SignUp.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewTutorial.vue"),
    props: true
  },
  {
    path: "/addLesson",
    name: "addLesson",
    component: () => import("./views/AddLesson.vue"),
    props: true
  },
  {
    path: "/editLesson",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;