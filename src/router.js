import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Survey from "./components/Survey.vue";
import UserOperations from "./components/UserOperations.vue"
import AddSurvey from "./views/AddSurvey.vue"
import EditSurvey from "./views/EditSurvey.vue"
import ViewSurvey from "./views/ViewSurvey.vue"
import AddUser from "./views/AddUser.vue"
import ViewUser from "./views/ViewUser.vue"
import UserView from "./views/UserView.vue"
import AssignSurvey from "./views/AssignSurvey.vue"
import RetrieveSurvey from "./views/RetrieveSurvey.vue"
import EditUser from "./views/EditUser.vue"
import EditAdmin from "./views/EditAdmin.vue"
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
    path: "/edit",
    name: "edit",
    component: EditSurvey,
  },
  {
    path: "/view",
    name: "view",
    component: ViewSurvey,
  },

  {
    path: "/addUser",
    name: "addUser",
    component: AddUser,
  },

  {
    path: "/viewuser",
    name: "viewuser",
    component: ViewUser,
  },

  {
    path: "/assignsurvey",
    name: "assignsurvey",
    component: AssignSurvey,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },

  {
    path: "/retrievesurvey",
    name: "retrievesurvey",
    component: RetrieveSurvey,
  },

  {
    path: "/edituser",
    name: "edituser",
    component: EditUser,
  },

  {
    path: "/editadmin",
    name: "editadmin",
    component: EditAdmin,
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;