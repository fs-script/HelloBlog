<template>
  <div>
    <n-card title="文章管理" style="margin-bottom: 16px">
      <n-tabs default-value="add" justify-content="start" type="line">
        <n-tab-pane name="list" tab="文章列表">
          
        </n-tab-pane>
        <n-tab-pane name="add" tab="添加文章">
          <n-form>
            <n-form-item label="标题">
              <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
            </n-form-item>
            <n-form-item label="分类">
              <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" />
            </n-form-item>
            <n-form-item label="内容">
              <BasicEditor v-model="addArticle.content" />
            </n-form-item>
            <n-form-item>
              <n-button secondary type="success" @click="add">
                <template #icon>
                <n-icon><add-icon /></n-icon>
            </template>
            提交
          </n-button>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="jay chou" tab="周杰伦">
          七里香
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { AdminStore } from '../stores/AdminStore'
import { useRouter, useRoute } from 'vue-router'
import BasicEditor from '../components/BasicEditor.vue'
import { AddCircle as AddIcon } from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()

const message = inject('message')
const dialog = inject('dialog')
const axios = inject('axios')

const adminStore = AdminStore()

const addArticle = reactive({
  title: "",
  categoryId: 0,
  content: "",
})

const categoryOptions = ref([])

onMounted(() => {
  loadCategory()
})

const loadCategory = async () => {
  let res = await axios.get('/category/list')
  categoryOptions.value = res.data.rows.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
}

const add = async () => {
  let res = await axios.post('/blog/_token/add', addArticle)
  if (res.data.code == 200) {
    message.success(res.data.msg)
    // 待做：清空页面
  } else {
    message.error(res.data.msg)
  }
}
</script>

<style scoped>

</style>