<template>
  <div class="main-panel">
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" show-trigger>
          <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
        </n-layout-sider>
        <n-layout>
          <RouterView />
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script setup>
import { h, ref, reactive, inject } from 'vue'
import { AdminStore } from '../stores/AdminStore'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  AlbumsOutline as ArticleIcon,
  FileTrayFullOutline as ClassifyIcon,
  LeafOutline as ExitIcon
} from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const route = useRoute()
const router = useRouter()

const axios = inject('axios')
const message = inject('message')

const adminStore = AdminStore()

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/dashboard/article'
        }
      },
      { default: () => '文章管理' }
    ),
    key: 'article-management',
    icon: renderIcon(ArticleIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/dashboard/category'
        }
      },
      { default: () => '分类管理' }
    ),
    key: 'classification-management',
    icon: renderIcon(ClassifyIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/login'
        }
      },
      { default: () => '退出' }
    ),
    key: 'exit',
    icon: renderIcon(ExitIcon)
  }
]
</script>

<style lang="scss" scoped>
.main-panel {
  width: 100vw;
}
</style>