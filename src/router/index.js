import { createRouter, createWebHistory } from "vue-router";
import  AnnouncementTable  from "../views/AnnouncementTable.vue";
import AddAnnouncement from "../views/AddAnnouncement.vue";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Modificationparam from "../views/Modificationparam.vue";
import Configurator from "../examples/Configurator.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/announcements",
    name: "Announcement",
    component: AnnouncementTable,
  },
  {
    path: "/addannouncement",
    name: "AddAnnouncemnt",
    component: AddAnnouncement,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/modifparam",
    name: "Modificationparam",
    component: Modificationparam,
    props: true
  },
  {
    path: "/configurator",
    name: "Configurator",
    component: Configurator,
    props:true
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
