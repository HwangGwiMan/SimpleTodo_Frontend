<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Router, useRoute, useRouter} from "vue-router";
// import { useAuthStore } from '@/store/auth'

// const authStore = useAuthStore()
const emit = defineEmits(['menuClick', ])

const clickMenu = () => {
  emit('menuClick');
}

const route = useRoute()

const router = useRouter() as Router

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
        123
        <!-- <template v-if="!authStore.userIsLoggedIn">
          <q-btn flat label="로그인" @click="router.push('/Login')" />
        </template>
        <template v-else>
          <span class="q-mr-sm">{{ authStore.currentUser?.username }}</span>
          <q-btn flat label="로그아웃" @click="authStore.logout()" />
        </template> -->
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
</style>
