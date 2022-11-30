import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './common/router';
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'
const { message, dialog, notification } = createDiscreteApi(["message", "dialog", "notification"])

const app = createApp(App)

// 全局依赖提供
app.provide('axios', axios)
app.provide('message', message)
app.provide('dialog', dialog)
app.provide('notification', notification)

app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')
