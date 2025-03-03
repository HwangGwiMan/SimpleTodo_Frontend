<script setup lang="ts">
import {onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import { useTokenStore } from '@/stores/loginStore';

const emit = defineEmits(['menuClick', ])

const clickMenu = () => {
  emit('menuClick');
}

const route = useRoute()
const loginStore = useTokenStore()
const router = useRouter()

const userName = computed(() => localStorage.getItem('username'))

onMounted(() => {
  console.log("Header Component mounted.");
})

</script>

<template>
  <q-header class="header bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="clickMenu"/>

      <q-toolbar-title>
        {{ route.name }}
      </q-toolbar-title>

      <div class="q-ml-md">
        <template v-if="!userName">
          <q-btn flat label="로그인" @click="router.push('/LoginPage')" />
        </template>
        <template v-else>
          <span class="q-mr-sm">{{ userName }}</span>
          <q-btn flat label="로그아웃" @click="loginStore.clearToken()" />
        </template>
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
</style>
