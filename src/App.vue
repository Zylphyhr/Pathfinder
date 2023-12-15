<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { usePathfinderStore } from "@/stores/pathfinderStore";
import {storeToRefs} from "pinia";

const store = usePathfinderStore();
const { character } = storeToRefs( store );
const continueFlag = ref(false);

onMounted(() => {
  axios.get('/character.json')
      .then(response => {
        store.setCharacter( response.data );
        continueFlag.value = true;
      })
      .catch(error => console.error('Error fetching the JSON file:', error));
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="row mt-3">
        <div class="col-lg-8 offset-lg-2 col-12">
          <ul class="nav nav-tabs "
              id="characterSheetTabs" role="tablist">
            <li class="nav-item rounded-top mx-1 border border-white">
              <router-link class="nav-link text-white" to="/stats">Stats & Skills</router-link>
            </li>
            <li class="nav-item rounded-top mx-1 border border-white">
              <router-link class="nav-link text-white" to="/combat">Combat</router-link>
            </li>
            <li v-if="character && character.spells.length > 0" class="nav-item rounded-top mx-1 border border-white">
              <router-link class="nav-link text-white" to="/spells">Spells</router-link>
            </li>
            <li class="nav-item rounded-top mx-1 border border-white">
              <router-link class="nav-link text-white" to="/actions">Actions</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <div v-if="continueFlag" class="tab-content" id="characterSheetTabsContent">
      <router-view></router-view>
    </div><div v-else class="d-flex justify-content-center align-items-center h2" style="height: 100vh;">
      Loading Character Data...
    </div>
  </main>
</template>

<style scoped>
li {
  background-color: darkslategray;
}
</style>
