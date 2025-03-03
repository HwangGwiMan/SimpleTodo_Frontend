<script setup lang="ts">
import axios from 'axios';
import { Dialog, Notify } from 'quasar';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const state = reactive({
  username: null as string | null | number,
  password: null as string | null | number,
})

const api = {
  register: async (username: string | number | null, password: string | number | null) => {
    const response = await axios.post('http://localhost:8080/api/users/signup', { username, password });
    return response.data;
  }
}

const register = () => {
  if (!state.username || !state.password) {
    Notify.create({
      message: '아이디와 비밀번호를 입력해주세요.',
      color: 'red',
      position: 'top',
      timeout: 3000,
    })
    return;
  }

  api.register(state.username, state.password).then((res) => {
    // 회원가입 성공 시 (코드 200)
    if (res.code === '200') {
      Notify.create({
        message: '회원가입 성공',
        color: 'green',
        position: 'top',
        timeout: 3000,
      })
      router.push('/LoginPage')
    }
  })
}
</script>

<template>
  <q-card style="width: 400px; margin: 0 auto; margin-top: 200px;">
    <q-card-section class="text-center">회원 가입</q-card-section>
    <q-card-section>
      <q-input v-model="state.username" label="Username" type="text" />
      <q-input v-model="state.password" label="Password" type="password" />
      <q-btn class="q-mt-md" label="Register" @click="register" />
      <q-btn class="q-mt-md q-ml-md" label="Cancel" to="/LoginPage" />
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: 'empty'
</route>
