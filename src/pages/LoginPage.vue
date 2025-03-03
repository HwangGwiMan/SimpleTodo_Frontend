<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { Notify } from 'quasar';
import { useTokenStore } from '@/stores/loginStore';
import { useRouter } from 'vue-router';

const router = useRouter()

const state = reactive({
  username: null as string | null | number,
  password: null as string | null | number,
})

const api = {
  login: async (username: string | number | null, password: string | number | null) => {
    await axios.post('http://localhost:8080/api/users/login', { username, password }).then((res) => {
      useTokenStore().loginAccess(res.data.accessToken, res.data.refreshToken, res.data.username, res.data.userId)
      router.push('/HomePage')
    }, (error) => {
      Notify.create({
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        color: 'warning',
        position: 'top',
        timeout: 3000,
      })
    })
  }
}

const login = async () => {
  if (!state.username || !state.password) {
    Notify.create({
      message: '아이디와 비밀번호를 입력해주세요.',
      color: 'red',
      position: 'top',
      timeout: 3000,
    })
  }

  await api.login(state.username, state.password)
}
</script>

<template>
  <q-card style="width: 400px; margin: 0 auto; margin-top: 200px;">
    <q-card-section class="text-center">로그인</q-card-section>
    <q-card-section>
      <q-input v-model="state.username" label="Username" type="text" />
      <q-input v-model="state.password" label="Password" type="password" />
      <q-btn class="q-mt-md" label="Login" @click="login" />
      <q-btn class="q-mt-md q-ml-md" label="Register" to="/SignupPage" />
      <q-btn class="q-mt-md q-ml-md" label="Cancel" to="/HomePage" />
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: 'empty'
</route>
