<script setup lang="ts">
import apiInstance from '@/api/apiInstance';
import { onMounted, reactive, ref } from 'vue';
import { Notify, type QTableProps } from 'quasar';
import _  from 'lodash';
import { useTokenStore } from '@/stores/loginStore';

const loginStore = useTokenStore()

interface TodoRow {
  dirtyFlag: string
  id: number
  title: string
  description: string
  completed: boolean
}

const pagination = ref<QTableProps['pagination']>({
  page: 1,
  rowsPerPage: 0,
})

const selectedRow = ref<TodoRow[]>([])

const api = {
  getByUserId: async (userId: number) => {
    const response = await apiInstance.post(`todos/get/by-user-id/`, {userId})
    console.log(response)
  },
  save: async (todo: unknown) => {
    const response = await apiInstance.post('todos/create', todo)
    console.log(response)
  }
}

const state = reactive({
  rows: [] as TodoRow[],
  columns: [
    { name: 'dirtyFlag', label: 'Dirty', field: 'dirtyFlag' },
    { name: 'title', label: 'Title', field: 'title' },
    { name: 'description', label: 'Description', field: 'description' },
    { name: 'completed', label: 'Completed', field: 'completed' },
  ],
})

const addTodo = () => {
  // 가장큰 id 값
  const maxId = Math.max(...state.rows.map((row: TodoRow) => row.id))

  state.rows.push({
    dirtyFlag: 'I',
    id: maxId + 1,
    title: 'New Todo',
    description: 'New Todo',
    completed: false
  })
}

const deleteTodo = () => {
  const selectedIds = selectedRow.value.map(row => row.id)
  state.rows = state.rows.filter(r => !selectedIds.includes(r.id))
}

const saveTodo = () => {
  const saveRows = state.rows.filter(r => !_.isNull(r.dirtyFlag))
  if(saveRows.length === 0) {
    Notify.create({
      message: '저장할 데이터가 없습니다.',
      color: 'info',
      icon: 'info'
    })
    return
  }
  api.save({todos :saveRows})
}

// TODO
// 조회해온 Todo 리스트를 테이블에 출력
const getTodoList = async () => {
  if(loginStore.userId !== null) {
    const response = await api.getByUserId(loginStore.userId)
    console.log(response)
  }
}

onMounted(() => {
  console.log('TodoPage mounted.')
  getTodoList()
})

</script>

<template>
  <q-page padding>
    <q-table
      title="Todo List"
      :rows="state.rows"
      :columns="state.columns"
      row-key="id"
      :style="{ height: 'calc(100vh - 98px)' }"
      flat
      dense
      bordered
      :pagination="pagination"
      selection="multiple"
      v-model:selected="selectedRow"
    >
    <template v-slot:top>
      <q-btn color="secondary"  label="Save" @click="saveTodo" />
      <q-btn color="primary" class="q-ml-sm" label="Add row" @click="addTodo" />
      <q-btn color="primary" class="q-ml-sm" label="Delete selected" @click="deleteTodo" />
    </template>

    <template v-slot:body-cell-dirtyFlag="props">
      <q-td :props="props">
        <q-icon
          v-if="props.row.dirtyFlag === 'I'"
          name="add_circle"
          color="primary"
          size="sm"
        />
        <q-icon
          v-if="props.row.dirtyFlag === 'U'"
          name="edit"
          color="warning"
          size="sm"
        />
        <q-icon
          v-if="props.row.dirtyFlag === 'D'"
          name="delete"
          color="negative"
          size="sm"
        />
      </q-td>
    </template>

    <template v-slot:body-cell="props">
      <q-td :props="props">
        <q-input
          v-model="props.row[props.col.name]"
          input-class="text-right"
          dense
          borderless
        />
      </q-td>
      </template>
  </q-table>
  </q-page>
</template>

<style scoped>

</style>

