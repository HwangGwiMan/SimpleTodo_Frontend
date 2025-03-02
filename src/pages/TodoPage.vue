<script setup lang="ts">
import apiInstance from '@/api/apiInstance';
import { onMounted, reactive, ref } from 'vue';
import type { QTableProps } from 'quasar';

const pagination = ref<QTableProps['pagination']>({
  page: 1,
  rowsPerPage: 0,
})

const api = {
  get: async () => {
    const response = await apiInstance.post('get/todos')
    console.log(response)
  },
  save: async (todo: unknown) => {
    const response = await apiInstance.post('save/todos', todo)
    console.log(response)
  }
}

const state = reactive({
  rows: [
    { id: 1, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  ],
  columns: [
    { name: 'name', label: 'Name', field: 'name' },
    { name: 'calories', label: 'Calories', field: 'calories' },
    { name: 'fat', label: 'Fat', field: 'fat' },
    { name: 'carbs', label: 'Carbs', field: 'carbs' },
    { name: 'protein', label: 'Protein', field: 'protein' },
  ],
})

const addTodo = () => {
  state.rows.push({ id: 2, name: 'New Todo', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 })
}

const saveTodo = () => {
  api.save(state.rows)
}

onMounted(() => {
  console.log('TodoPage mounted.')
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
    >
    <template v-slot:top>
      <q-btn color="primary" label="Add row" @click="addTodo" />
      <q-btn color="primary" class="q-ml-sm" label="Save" @click="saveTodo" />
    </template>

    <template v-slot:body-cell="props">
      <q-td :props="props">
        <q-input
          v-model="props.row[ props.col.name ]"
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

