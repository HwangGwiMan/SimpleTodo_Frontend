<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  input: '',
})
</script>

<template>
  <div class="row">
    <q-input v-model="state.input" label="등록된 TODO 개수" dense outlined stack-label style="margin: 10px"  />
  </div>
</template>

<style scoped>

</style>

