import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/login', component: () => import('../views/Login.vue') },
  {
    path: '/dashboard', component: () => import('../views/Dashboard.vue'),children: [
      {path: '/dashboard/article', component: () => import('../views/Article.vue')}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
