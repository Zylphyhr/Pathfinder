import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { usePathfinderStore } from "@/stores/pathfinderStore";

import Home from "@/components/home.vue";
import Actions from "@/components/actions.vue";
import Combat from "@/components/combat.vue";
import Stats from "@/components/stats.vue";
import Spells from "@/components/spells.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    },
    {
      path: '/:catchAll(.*)',
      name:'home',
      component: Home
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = usePathfinderStore();
  const curChar = localStorage.getItem('characterData');

  if( to.name === "home" || store.character ) { // Can always go home.
    next();                                     // and Characters can go anywhere.
  } else if( ! curChar ) {                      // Otherwise, see if character is
    next({ name: 'home' });                     // loading, if not... go Home!
  } else {                                      // Wait til character loads, and Boom!
    try {
      await store.loadCharacter( curChar );
      next();
      localStorage.removeItem('characterData');
    } catch (err) {
      console.error("Error loading character data: ", err);
      next({ name: 'home' });
      localStorage.removeItem('characterData');
    }
  }
});

export default router