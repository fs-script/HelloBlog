<template>
  <div class="category-panel">
    <n-card :bordered="false" title="分类管理">
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="category in categoryList">
          <tr>
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
              <n-space>
                <n-button strong secondary type="primary" @click="toUpdate(category)">修改</n-button>
                <n-button strong secondary type="warning" @click="deleteCategory(category)">删除</n-button>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>

      <n-button class="add-button" strong secondary type="primary" @click="showModal = true">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        添加
      </n-button>

      <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
        <template #header>
          <div>添加分类</div>
        </template>
        <n-space vertical>
          <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称" />
        </n-space>
        <template #action>
          <n-button secondary type="primary" @click="add">
            <template #icon>
              <n-icon>
                <add-icon />
              </n-icon>
            </template>
            提交
          </n-button>
        </template>
      </n-modal>

      <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
        <template #header>
          <div>修改分类</div>
        </template>
        <n-space vertical>
          <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称" />
        </n-space>
        <template #action>
          <n-button strong secondary type="primary" @click="update">
            <template #icon>
              <n-icon>
                <add-icon />
              </n-icon>
            </template>
            提交
          </n-button>
        </template>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { GitCommit as AddIcon } from '@vicons/ionicons5'

const axios = inject('axios')
const message = inject('message')
const dialog = inject('dialog')

const categoryList = ref([])
const showModal = ref(false)
const showUpdateModal = ref(false)

const addCategory = reactive({
  name: '',
})

const updateCategory = reactive({
  id: 0,
  name: '',
})

onMounted(() => {
  loadData()
})

// 获取分类列表
const loadData = async () => {
  let res = await axios.get('/category/list')
  categoryList.value = res.data.rows
}

// 添加分类
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

// 弹出修改
const toUpdate = (category) => {
  showUpdateModal.value = true
  updateCategory.id = category.id
  updateCategory.name = category.name
}

// 修改分类
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

// 删除分类
const deleteCategory = async (category) => {
  dialog.warning({
    title: '删除',
    content: '确认删除？',
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
      message.info('已取消')
    }
  })
}
</script>

<style lang="scss" scoped>
.category-panel {
  padding: 20px;

  .add-button {
    margin: 20px 0;
  }
}
</style>
