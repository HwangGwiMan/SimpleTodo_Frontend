<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue'
import Drawer from "@/components/DrawerComponent.vue";
import {onMounted, ref} from "vue";

const drawerShow = ref(false);

onMounted(() => {
  console.log('Layout mounted.')
})

</script>

<template>
  <q-layout view="hhh lpR fFf" >

    <Header
        @menu-click="drawerShow = !drawerShow"
    />

    <Drawer
        v-model:drawer-show="drawerShow"
    />

    <q-page-container >
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<style scoped>

</style>
