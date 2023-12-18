<script setup>
import { usePathfinderStore } from "@/stores/pathfinderStore";
import {storeToRefs} from "pinia";

const store = usePathfinderStore();
const { character } = storeToRefs( store );
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="row mt-3">
        <div class="col-lg-8 offset-lg-2 col-12">
          <ul class="nav nav-tabs "
              id="characterSheetTabs" role="tablist">
            <li class="nav-item rounded-top mx-1 border border-white text-center">
              <router-link class="nav-link text-white" to="/stats">Stats & Skills</router-link>
            </li>
            <li class="nav-item rounded-top mx-1 border border-white text-center">
              <router-link class="nav-link text-white" to="/combat">Combat</router-link>
            </li>
            <li v-if="character && character.spells.length > 0" class="nav-item rounded-top mx-1 border border-white text-center">
              <router-link class="nav-link text-white" to="/spells">Spells</router-link>
            </li>
            <li class="nav-item rounded-top mx-1 border border-white text-center">
              <router-link class="nav-link text-white" to="/actions">Actions</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <main>
      <router-view></router-view>
  </main>
</template>

<style scoped>
li {
  background-color: darkslategray;
}
.nav-item { width: 140px; }
.nav-item:hover {
  font-size: 1.05em;
  transition: font-size 100ms ease-in-out;
}
</style>
