<template>
  <div class="container">
    <div class="nav">
      <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
      @update:value="selectedCategory"
      />
      <n-space>
        <n-input v-model:value="pageInfo.keyword" :style="{ width: '200px' }" placeholder="请输入关键字" />
        <n-button type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
      </n-space>
    </div>

    <n-carousel show-arrow autoplay>
      <img class="carousel-img" src="../assets/banner_1.jpg" />
      <img class="carousel-img" src="../assets/banner_2.jpg" />
      <img class="carousel-img" src="../assets/banner_3.jpg" />
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click="prev">
            <n-icon><ArrowBack /></n-icon>
          </button>
          <button type="button" class="custom-arrow--right" @click="next">
            <n-icon><ArrowForward /></n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>

    <n-divider />

    <div class="article" v-for="blog in blogListInfo">
      <n-card :title="blog.title" @click="toDetail(blog)" hoverable>
        <div v-html="blog.content"></div>
        <template #footer>
          <n-space align="center">
            <div>发布时间：{{ blog.create_time }}</div>
          </n-space>
        </template>
      </n-card>
    </div>

    <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

    <n-divider />

    <div class="home-footer">
      <div>Hello Blog</div>
      <div>ICP备 XXXXXX号-1</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, h, onMounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { NIcon } from "naive-ui";
import {
  FishOutline as HomeIcon,
  FileTrayOutline as CategoryIcon,
  CogOutline as LoginIcon,
  ArrowBack,
  ArrowForward
} from "@vicons/ionicons5"

const axios = inject("axios")
const router = useRouter()

const activeKey = ref()
const menuOptions = ref([])
const blogListInfo = ref([])

const pageInfo = reactive({
  page: 1,
  pageSize: 3,
  pageCount: 0,
  count: 0,
  keyword: "",
  categoryId:0,
})

onMounted(() => {
  loadCategoryOption()
  loadBlogs()
})

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

// 获取导航列表
const loadCategoryOption = async () => {
  const res = await axios.get("/category/list")
  let categoryChildren = []

  for (const item of res.data.rows) {
    categoryChildren.push({
      label: item.name,
      key: item.id,
    })
  }

  menuOptions.value = [
    {
      label: () => h(
      RouterLink,
      { to: { path: "/" } },
      { default: () => "首页" },
    ),
    key: "0",
    icon: renderIcon(HomeIcon),
    },
    {
      label: "分类",
      key: "1",
      icon: renderIcon(CategoryIcon),
      children: categoryChildren,
    },
    {
    label: () => h(
      RouterLink,
      { to: { path: "/login" } },
      { default: () => "登录" },
    ),
    key: "2",
    icon: renderIcon(LoginIcon),
    },
  ]
}

// 选择分类
const selectedCategory = (key) => {
  pageInfo.categoryId = key ;
  loadBlogs()
}

// 获取博客列表
const loadBlogs = async (page = 0) => {
  if (page != 0) {
    pageInfo.page = page;
  }

  let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
  let temp_rows = res.data.data.rows;
  // 处理获取的文章列表数据
  for (let row of temp_rows) {
    row.content += "..."
    // 把时间戳转换为年月日
    let d = new Date(row.create_time)
    row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }
  blogListInfo.value = temp_rows;
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}

// 详情页跳转
const toDetail = (blog)=>{
  router.push({ path:"/detail", query:{ id: blog.id } })
}
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  margin: 0 auto;

  .nav {
    width: 960;
    height: 60px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .n-menu {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
  }

  .custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
  }

  .custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
  }

  .custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  .custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-dots li.is-active {
    width: 40px;
    background: #fff;
  }

  .article {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .home-footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
  }
}
</style>
