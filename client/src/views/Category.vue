<template>
  <div>
    <n-button @click="showModal = true">
      添加
    </n-button>

    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-for="(category, index) in categoryList">
        <tr>
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <n-space>
              <n-button strong secondary type="success" @click="toUpdate(category)">修改</n-button>
              <n-button strong secondary type="warning" @click="deleteCategory(category)">删除</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
      <template #header>
        <div>添加分类</div>
      </template>
      <div>
        <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称" />
      </div>
      <template #action>
        <div>
          <n-button secondary type="success" @click="add">
            <template #icon>
              <n-icon><add-icon /></n-icon>
            </template>
            提交
          </n-button>
        </div>
      </template>
    </n-modal>

    <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
      <template #header>
        <div>修改分类</div>
      </template>
      <div>
        <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称" />
      </div>
      <template #action>
        <div>
          <n-button secondary type="success" @click="update">
            <template #icon>
              <n-icon><add-icon /></n-icon>
            </template>
            提交
          </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { AdminStore } from '../stores/AdminStore'
import { useRouter, useRoute } from 'vue-router'
import { AddCircle as AddIcon } from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()

const message = inject('message')
const dialog = inject('dialog')
const axios = inject('axios')

const adminStore = AdminStore()

const categoryList = ref([])
const showModal = ref(false)
const showUpdateModal = ref(false)

const addCategory = reactive({
  name: ''
})

const updateCategory = reactive({
  id: 0,
  name: '',
})

onMounted(() => {
  loadData()
})

const loadData = async () => {
  let res = await axios.get('/category/list')
  categoryList.value = res.data.rows
}

const add = async () => {
  let res = await axios.post('/category/_token/add', { name: addCategory.name })
  if (res.data.code == 200) {
    loadData()
    message.info(res.data.msg)
  } else {
    message.info(res.data.msg)
  }

  showModal.value = false
}

const toUpdate = (category) => {
  showUpdateModal.value = true
  updateCategory.id = category.id
  updateCategory.name = category.name
}

const update = async () => {
  let res = await axios.put('/category/_token/update', { id: updateCategory.id, name: updateCategory.name })
  if (res.data.code == 200) {
    loadData()
    message.success(res.data.msg)
  } else {
    message.error(res.data.msg)
  }
  showUpdateModal.value = false
}

const deleteCategory = async (category) => {
  dialog.warning({
    title: '警告',
    content: '是否删除？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      let res = await axios.delete(`/category/_token/delete?id=${category.id}`)
      if (res.data.code == 200) {
        loadData()
        message.success(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    },
    onNegativeClick: () => {
      message.info('已取消操作')
    }
  })
}

</script>

<style scoped>

</style>