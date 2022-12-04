import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/detail", component: () => import("../views/Detail.vue") },
  {
    path: "/dashboard", component: () => import("../views/Dashboard.vue"),
    children: [
      { path: "/dashboard/article", component: () => import("../views/Article.vue") },
      { path: "/dashboard/category", component: () => import("../views/Category.vue") }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
