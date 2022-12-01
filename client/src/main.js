import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './common/router';
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import axios from 'axios';
import { AdminStore } from './stores/AdminStore'

axios.defaults.baseURL = 'http://localhost:8080'
const { message, dialog, notification } = createDiscreteApi(["message", "dialog", "notification"])

const app = createApp(App)

// 全局依赖提供
app.provide('axios', axios)
app.provide('message', message)
app.provide('dialog', dialog)
app.provide('notification', notification)
app.provide('server_url', axios.defaults.baseURL)

app.use(createPinia())
app.use(router)
app.use(naive)

const adminStore = AdminStore()

// 拦截器
axios.interceptors.request.use((config) => {
  config.headers.token = adminStore.token
  return config
})

app.mount('#app')
