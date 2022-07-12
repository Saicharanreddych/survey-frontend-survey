import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
// lazy-loaded

//const BoardAdmin = () => import("./components/BoardAdmin.vue")
//const BoardModerator = () => import("./components/BoardModerator.vue")
//const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
 
  {
    path: "/register",
    component: Register,
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;