<script setup>
import { usePathfinderStore } from "@/stores/pathfinderStore";
import {getCharacters} from "@/utils";
import {useRouter} from "vue-router";

const store = usePathfinderStore();
const characters = getCharacters();
const router = useRouter();

/* ChatGPT code... need to learn it */
const loadChar = async(short) => {
  try {
    await store.loadCharacter(short);
    await router.push({ name: 'stats' }).catch(err => {
      console.error("Error during navigation: ", err);
    });
  } catch(err) {
    console.error("Error during character load: ", err);
  }
};

</script>

<template>
  <div class="col-lg-8 offset-lg-2 col-12">
    <div class="row mt-3">
      <div v-for="character in characters" :key="character.name" class="col-lg-2 col-md-4 col-6 m-2">
        <div class="card" @click="loadChar(character.short)" style="cursor: pointer">
          <img class="card-img-top" :src="`${character.short}.png`" :alt="`Character image of ${character.short}`">
          <div class="card-header text-center">
            <strong>{{ character.short }}</strong><br>
            {{ character.info }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>