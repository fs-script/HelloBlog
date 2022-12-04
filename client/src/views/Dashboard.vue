<template>
  <div>
    <n-space vertical>
      <n-layout class="n-layout-main" has-sider>
        <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="180" show-trigger>
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
import { h } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  AlbumsOutline as ArticleIcon,
  FileTrayFullOutline as ClassifyIcon,
  LogOutOutline as ExitIcon
} from '@vicons/ionicons5'

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      { to: { path: '/dashboard/article' } },
      { default: () => '文章管理' }
    ),
    key: 'article-management',
    icon: renderIcon(ArticleIcon)
  },
  {
    label: () => h(
      RouterLink,
      { to: { path: '/dashboard/category' } },
      { default: () => '分类管理' }
    ),
    key: 'classification-management',
    icon: renderIcon(ClassifyIcon)
  },
  {
    label: () => h(
      RouterLink,
      { to: { path: '/login' } },
      { default: () => '退出后台' }
    ),
    key: 'exit-background',
    icon: renderIcon(ExitIcon)
  },
]

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<style lang="scss" scoped>
.n-layout-main {
  width: 100vw;
  height: 100vh;

  .n-layout-sider {
  padding-top: 20px;
  background: rgba(245,247,250,1);
  }
}
</style>
