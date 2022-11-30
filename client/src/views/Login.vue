<template>
  <div class="login-panel">
    <n-card title="登录后台管理">
      <n-form :rules="rules" :model="admin">
        <n-form-item path="account" label="账号">
          <n-input v-model:value="admin.account" placeholder="请输入账号" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-checkbox v-model:checked="admin.remember" label="记住我" />
        <n-button @click="login">登录</n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { AdminStore } from '../stores/AdminStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const axios = inject('axios')
const message = inject('message')

const adminStore = AdminStore()

let rules = {
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" }
  ],
}

const admin = reactive({
  account: localStorage.getItem('account') || '',
  password: localStorage.getItem('password') || '',
  remember: localStorage.getItem('remember') || false,
})

const login = async () => {
  let result = await axios.post('/admin/login', {
    account: admin.account,
    password: admin.password
  })

  if (result.data.code == 200) {
    adminStore.id = result.data.data.id
    adminStore.account = result.data.data.account
    adminStore.token = result.data.data.token

    // 记住我
    if (admin.remember) {
      localStorage.setItem('account', admin.account)
      localStorage.setItem('password', admin.password)
      localStorage.setItem('remember', admin.remember)
    }

    router.push('/dashboard')
    message.success('登录成功')
  } else {
    message.error('登录失败')
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 500px;
  margin: 130px auto 0px;
}
</style>