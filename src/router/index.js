import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Actions from "@/components/actions.vue";
import Combat from "@/components/combat.vue";
import Stats from "@/components/stats.vue";
import Spells from "@/components/spells.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stats',
      component: Stats
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/combat',
      name: 'combat',
      component: Combat
    },
    {
      path: '/spells',
      name: 'spells',
      component: Spells
    },
    {
      path: '/actions',
      name: 'actions',
      component: Actions
    }
  ]
})

export default router
