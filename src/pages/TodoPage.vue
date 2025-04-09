<script setup lang="ts">
import apiInstance from '@/api/apiInstance';
import {onMounted, reactive, ref} from 'vue';
import {Notify, type QTableProps} from 'quasar';
import _ from 'lodash';
import {useTokenStore} from '@/stores/loginStore';
import CommonUtil from '@/utils/CommonUtil';

const loginStore = useTokenStore()

interface TodoRow {
  id?: number
  dirtyFlag?: 'I' | 'D' | 'U'
  userId: number
  content: string | null
  startDateTime: string | null
  endDateTime: string | null
  alarmDateTime: string | null
}

const pagination = ref<QTableProps['pagination']>({
  page: 1,
  rowsPerPage: 0,
})

const selectedRow = ref<TodoRow[]>([])

const api = {
  getByUserId: async (userId: number) : Promise<TodoRow[]> => {
    const response = await apiInstance.get(`todos/get/${userId}`)
    return CommonUtil.response(response)
  },
  save: async (todo: unknown) => {
    const response = await apiInstance.post('todos/save', todo)
    return CommonUtil.response(response)
  }
}

const state = reactive({
  rows: [] as TodoRow[],
  columns: [
    { name: 'dirtyFlag', label: 'Dirty', field: 'dirtyFlag', style: 'width: 50px', headerStyle: 'width: 50px' },
    { name: 'content', label: 'Content', field: 'content', style: 'width: 500px', headerStyle: 'width: 500px' },
    { name: 'startDateTime', label: 'Start DateTime', field: 'startDateTime', style: 'width: 500px', headerStyle: 'width: 500px' },
    { name: 'endDateTime', label: 'End DateTime', field: 'endDateTime', style: 'width: 500px', headerStyle: 'width: 500px' },
    { name: 'alarmDateTime', label: 'Alarm DateTime', field: 'alarmDateTime', style: 'width: 500px', headerStyle: 'width: 500px' },
  ],

  // 로그인 여부
  isLogin: false,
})

/**
 * 새로운 할일 추가
 */
const addTodo = () => {
  if (!loginStore.userId) return

  const maxId = Math.max(...state.rows.map((row: TodoRow) => row.id || 0))

  state.rows.push({
    id: maxId + 1,
    dirtyFlag: 'I',
    userId: loginStore.userId,
    content: 'New Todo',
    startDateTime: null,
    endDateTime: '',
    alarmDateTime: ''
  })
}

/**
 * 선택된 할일 삭제
 */
const deleteTodo = () => {
  const selectedIds = selectedRow.value.map(row => row.id)
  state.rows = state.rows.filter(r => !selectedIds.includes(r.id))
}

/**
 * 할일 저장
 */
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
  api.save({todoList :saveRows})
}

/**
 * 할일 목록 조회
 */
const getTodoList = async () => {
  if(loginStore.userId !== null) {
    state.rows = await api.getByUserId(loginStore.userId)
  }
}

onMounted(() => {
  console.log('TodoPage mounted.')
  state.isLogin = loginStore.isLoggedIn
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
      <q-btn color="primary" class="q-ml-sm" label="Add" @click="addTodo" />
      <q-btn color="primary" class="q-ml-sm" label="Delete" @click="deleteTodo" />
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

