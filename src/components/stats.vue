<script setup>
import { usePathfinderStore } from '@/stores/pathfinderStore';
import { storeToRefs } from "pinia";
import {modifier, fortitudeSave, reflexSave, willSave, skillBonuses, cmb, cmd} from "@/utils";
import {ref} from "vue";

const store = usePathfinderStore();
const { character } = storeToRefs( store );

const handleImageError = () => {
  character.imageURL = '';
  imageError.value = true;
};
const imageError = ref(false);
</script>

<template>
  <div class="col-lg-8 offset-lg-2 col-12">
    <div class="row mt-3">

      <!-- First Column - Character Info -->
      <div class="col-lg-4 col-md-6 col-12">
        <template v-if="!imageError">
          <img :src="character.imageURL" class="img-fluid" alt="Character Portrait" @error="handleImageError">
        </template>
        <template v-else>
          <i class="bi bi-person-bounding-box m-4" style="font-size: 16em;"></i>
        </template>
        <h1 class="h2">{{ character.characterName }}</h1>
        <div>Race: {{ character.race }}</div>
        <div>Class: {{ character.characterClass }}</div>
        <!-- Archetypes and description text -->
      </div>

      <!-- Second Column - Stats -->
      <div class="col-lg-4 col-md-6 col-12">
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Strength:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.strength }} (+{{ modifier(character.strength) }})</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Constitution:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.constitution }} (+{{ modifier(character.constitution) }})</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Dexterity:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.dexterity }} (+{{ modifier(character.dexterity) }})</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Intelligence:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.intelligence }} (+{{ modifier(character.intelligence) }})</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Wisdom:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.wisdom }} (+{{ modifier(character.wisdom) }})</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Charisma:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.charisma }} (+{{ modifier(character.charisma) }})</div>
        </div>
        <hr>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Speed:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ character.speed }}</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Perception:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ (character.skills?.find(skill => skill.name === 'Perception') || {}).bonus }}</div>
        </div>
        <hr>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Fortitude:</div>
          <div class="col-4 text-center rounded-end bordered dark">+{{ fortitudeSave(character) }}</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Reflexes:</div>
          <div class="col-4 text-center rounded-end bordered dark">+{{ reflexSave(character) }}</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Willpower:</div>
          <div class="col-4 text-center rounded-end bordered dark">+{{ willSave(character) }}</div>
        </div>
        <hr>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Combat Maneuver Bonus:</div>
          <div class="col-4 text-center rounded-end bordered dark">+{{ cmb(character) }}</div>
        </div>
        <div class="row m-1">
          <div class="col-8 text-end rounded-start bordered slate">Combat Maneuver Defence:</div>
          <div class="col-4 text-center rounded-end bordered dark">{{ cmd(character) }}</div>
        </div>
        <hr>
      </div>

      <!-- Third Column - Skills -->
      <div class="col-lg-4 col-md-6 col-12">
        <div v-for="skill in skillBonuses(character)" :key="skill.name" v-show="skill.usable || skill.value > 0">
          <div class="row m-1">
            <div class="col-8 text-end rounded-start bordered slate"> {{ skill.name }} </div>
            <div class="col-4 text-center rounded-end bordered dark"> {{ skill.bonus }} </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.slate { background-color: darkslategray; }
.bordered { border: grey 2px solid; }
.dark { background-color: #101C34; }
</style>