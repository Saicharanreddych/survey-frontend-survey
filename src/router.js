
import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Survey from "./components/Survey.vue";
import UserOperations from "./components/UserOperations.vue"
import AddSurvey from "./views/AddSurvey.vue"

import ViewSurvey from "./views/ViewSurvey.vue"
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const Admin = () => import("./components/Admin.vue")
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
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/survey",
    name: "survey",
    component: Survey,
  },
  {
    path: "/userOp",
    name: "userOp",
    component: UserOperations,
  },
  {
    path: "/addsurvey",
    name: "addsurvey",
    component: AddSurvey,
  },
 
  {
    path: "/view",
    name: "view",
    component: ViewSurvey,
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;

