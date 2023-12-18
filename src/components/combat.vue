<script setup>
import { usePathfinderStore } from "@/stores/pathfinderStore";
import {computed} from "vue";
import { storeToRefs } from "pinia";
import { initiative, cmb, cmd, getDamageBase,
  calculateHitChance, calculateDamageBonus, calculateCrit,
  standardAC, touchAC, flatFootedAC,
  fortitudeSave, reflexSave, willSave } from "@/utils";

const store = usePathfinderStore();
const { incrementHPs, decrementHPs } = store;
const { character, currentHPs, maxHPs } = storeToRefs( store );

const hpColor    = computed( () => {
  const colorRanges = ['darkred', 'darkorange', 'darkgoldenrod', 'darkgreen', 'darkblue', 'darkblue'];
  const index = Math.floor( ( currentHPs.value / maxHPs.value ) * (colorRanges.length - 1));
  return colorRanges[index];
});

</script>

<template>
  <div class="container-fluid bg-dark text-white mt-3 col-lg-8 offset-lg-2 col-12">
    <div class="row pb-5">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-dark-subtle">
            Combat Stats
          </div>
          <div class="card-body text-white bg-dark">
            <div class="row m-1">
              <div class="col-6 text-end rounded-start bordered slate">Max HPs:</div>
              <div class="col-6 text-center rounded-end bordered dark">{{ maxHPs }}</div>
            </div>
            <div class="row m-1">
              <div class="col-12 d-flex align-items-center">
                <button class="btn btn-danger" @click="decrementHPs">-</button>
                <input type="text" class="form-control text-center my-4 mx-2 text-white"
                       v-model.number="currentHPs" :max="maxHPs" :min="0"
                       :style="{ backgroundColor: hpColor }">
                <button class="btn btn-success" @click="incrementHPs">+</button>
              </div>
            </div><hr>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Initiative:</div>
              <div class="col-4 text-center rounded-end bordered dark">+{{ initiative( character ) }}</div>
            </div>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Speed:</div>
              <div class="col-4 text-center rounded-end bordered dark">{{ character.speed }}</div>
            </div>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">CMB/CMD:</div>
              <div class="col-4 text-center rounded-end bordered dark">+{{ cmb( character ) }}/{{ cmd( character ) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-dark-subtle">
            Armour Class
          </div>
          <div class="card-body text-white bg-dark">
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Base AC:</div>
              <div class="col-4 text-center rounded-end bordered dark">{{ standardAC( character ) }}</div>
            </div>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Touch AC:</div>
              <div class="col-4 text-center rounded-end bordered dark">{{ touchAC( character ) }}</div>
            </div>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Flat-Footed AC:</div>
              <div class="col-4 text-center rounded-end bordered dark">{{ flatFootedAC( character ) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-dark-subtle">
            Saving Throws
          </div>
          <div class="card-body text-white bg-dark">
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Fortitude:</div>
              <div class="col-4 text-center rounded-end bordered dark">+{{ fortitudeSave( character ) }}</div>
            </div>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Reflexes:</div>
              <div class="col-4 text-center rounded-end bordered dark">+{{ reflexSave( character ) }}</div>
            </div>
            <div class="row m-1">
              <div class="col-8 text-end rounded-start bordered slate">Willpower:</div>
              <div class="col-4 text-center rounded-end bordered dark">+{{ willSave( character ) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="weapon in character.weapons" :key="weapon.id">
        <div class="card">
          <div class="card-header bg-dark-subtle">
            {{ weapon.name }}
          </div>
          <div class="card-body text-white bg-dark">
            <div class="d-flex justify-content-between m-1">
              <div class="flex-grow-1 px-2 text-end rounded-start bordered slate">Chance to Hit:</div>
              <div class="flex-shrink-1 px-2 min-width-33 text-center rounded-end bordered dark">{{ calculateHitChance(weapon, character) }}</div>
            </div>
            <div class="d-flex justify-content-between m-1">
              <div class="flex-grow-1 px-2 text-end rounded-start bordered slate">Critical Chance:</div>
              <div class="flex-shrink-1 px-2 min-width-33 text-center rounded-end bordered dark">{{ calculateCrit(weapon) }}</div>
            </div>
            <div class="d-flex justify-content-between m-1">
              <div class="flex-grow-1 px-2 text-end rounded-start bordered slate">Damage:</div>
              <div class="flex-shrink-1 px-2 min-width-33 text-center rounded-end bordered dark">{{ getDamageBase(weapon, character) }}{{ calculateDamageBonus(weapon, character) }}</div>
            </div>
            <hr>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="powerAttack-{{weapon.id}}" v-model="weapon.powerAttack">
              <label class="form-check-label" for="powerAttack-{{weapon.id}}">Power Attack</label>
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="charging-{{weapon.id}}" v-model="weapon.charging">
              <label class="form-check-label" for="charging-{{weapon.id}}">Charging (+2/-2)</label>
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="flanking-{{weapon.id}}" v-model="weapon.flanking">
              <label class="form-check-label" for="flanking-{{weapon.id}}">Flanking (+2)</label>
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="energy-{{weapon.id}}" v-model="weapon.energy">
              <label class="form-check-label" for="energy-{{weapon.id}}">Samurai Bonus (+1)</label>
            </div>
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
.min-width-33 { min-width: 33%; }
</style>