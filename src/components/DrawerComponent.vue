<script setup lang="ts">

import {onMounted} from "vue";

const drawerShow = defineModel<boolean>('drawerShow', {required: true})

onMounted(() => {
  console.log("Drawer Component mounted.");
})


</script>

<template>
  <q-drawer side="left" bordered overlay v-model="drawerShow" behavior="desktop" >
    <q-scroll-area class="fit">
      <q-item>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-btn label="Home" to="/HomePage" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon name="list" />
        </q-item-section>
        <q-item-section>
          <q-btn label="Todo" to="/TodoPage" />
        </q-item-section>
      </q-item>
  </q-scroll-area>
  </q-drawer>
</template>

<style scoped>

</style>
