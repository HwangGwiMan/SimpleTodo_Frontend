import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages';
import { setupLayouts } from "virtual:generated-layouts";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})
