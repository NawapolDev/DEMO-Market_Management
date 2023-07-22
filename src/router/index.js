import { createRouter, createWebHistory } from "vue-router";
import Navigation from "../views/NavigationView.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import LeaveForm from "../views/LeaveForm.vue";
import MainView from "../views/MainView.vue";
import MarketView from "../views/MarketView.vue";
import AdminView from "../views/AdminView.vue";
import Receipt from "../views/Receipt.vue";
import Blog from "../views/Blog.vue";
import QRcodeView from "../views/QRcodeView.vue"

const routes = [
  { 
    path: "/",
    redirect: "/main",
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog
  },
  { 
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/leaveform",
    name: "leaveform",
    component : LeaveForm
  },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "/main",
        name: "main",
        component: MainView,
      },
      {
        path: "/market",
        name: "market",
        component: MarketView,
      },
      {
        path: "/employee",
        name: "employee",
        component: AdminView,
      },
      {
        path: "/receipt",
        name: "receipt",
        component: Receipt
      },
      {
        path: "/qrcode",
        name: "qrcode",
        component: QRcodeView
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
