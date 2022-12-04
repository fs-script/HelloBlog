<template>
  <div class="login-panel">
    <n-card>
      <n-form :rules="rules" :model="admin">
        <n-form-item path="account" label="账号">
          <n-input v-model:value="admin.account" placeholder="请输入账号" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="space-between">
          <n-checkbox v-model:checked="admin.remember" label="记住我" />
          <n-button strong secondary type="primary" @click="login">登 录</n-button>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { AdminStore } from '../stores/AdminStore'

const router = useRouter()
const adminStore = AdminStore()

const axios = inject('axios')
const message = inject('message')

const admin = reactive({
  account: localStorage.getItem('account') || '',
  password: localStorage.getItem('password') || '',
  remember: localStorage.getItem('remember') || false,
})

let rules = {
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 12, message: "账号长度 3 - 12", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度 6 - 18", trigger: "blur" },
  ],
}

const login = async () => {
  let result = await axios.post('/admin/login', {
    account: admin.account,
    password: admin.password
  })

  if(result.data.code == 200) {
    adminStore.id = result.data.data.id
    adminStore.account = result.data.data.account
    adminStore.token = result.data.data.token

    // 记住我
    if (admin.remember) {
      localStorage.setItem('account', admin.account)
      localStorage.setItem('password', admin.password)
      localStorage.setItem('remember', admin.remember)
    }

    router.push('/dashboard/article')
    message.success('登录-成功')
  } else {
    message.error('登录-失败')
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/login_back.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .n-card {
  width: 400px;
  border: none;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(15px);
  }
}
</style>
