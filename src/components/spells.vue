<script setup>
  import { usePathfinderStore } from '@/stores/pathfinderStore';
  import {storeToRefs} from "pinia";
  import {getDC, concentration} from "@/utils";

  const store = usePathfinderStore();
  const { character } = storeToRefs( store );
</script>

<template>
    <div class="container-fluid bg-dark text-white mt-3 col-lg-8 offset-lg-2 col-12">
      <div class="row">
        <div class="col-md-4" v-for="spell in character.spells" :key="spell.name">
          <div class="card mb-2 darkened text-white">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div>{{ spell.name }}</div><div>Level: {{ spell.level }}</div>
              </div>
              <div class="d-flex justify-content-between" style="font-size: 0.8em;" >
                <div >({{ spell.school }})</div><div>DC: {{ getDC(character, spell) }}</div>
              </div>
              <div class="d-flex justify-content-between" style="font-size: 0.8em;" >
                <div ></div><div>Concentration: {{ concentration(character) }}</div>
              </div>
            </div>
            <div class="card-body bg-dark text-white p-2 m-2">
									<span class="card-text" style="font-size: 0.8em;">
										<div><strong>Casting Time:</strong> {{ spell.castingTime }}</div>
										<div v-if="spell.area"><strong>Area:</strong> {{ spell.area }}</div>
										<div><strong>Components:</strong> {{ spell.components }}</div>
										<div><strong>Duration:</strong> {{ spell.duration }}</div>
										<div><strong>Range:</strong> {{ spell.range }}</div>
										<div v-if="spell.targets"><strong>Target(s):</strong> {{ spell.targets }}</div>
										<div v-if="spell.savingThrow !== 'None'"><strong>Saving Throw:</strong> {{ spell.savingThrow }}</div>
										<div v-if="spell.spellResistance !== 'No'"><strong>Spell Resistance:</strong> {{ spell.spellResistance }}</div>
									</span>
              </div>
            <hr class="card-text"/><span class="mx-2 mb-2">{{ spell.description }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.darkened { background-color: darkslategrey; }
</style>