<script setup>
import { ref, onMounted } from "vue";
import { usePathfinderStore } from '@/stores/pathfinderStore';
import { storeToRefs } from "pinia";
import { filteredSwiftActions, filteredStandardActions, filteredMoveActions, fullRoundActions } from "@/utils";

const selectedFullRound = ref('');
const selectedSwift = ref('');
const selectedMove = ref('');
const selectedStandard = ref('');

const store = usePathfinderStore();
const { character } = storeToRefs( store );

function resetActions() {
  selectedSwift.value = '';
  selectedMove.value = '';
  selectedStandard.value = '';
  selectedFullRound.value = '';
}

/* MY trickiest code... so adding comments for when I come back to it...
   I added a usage array that is the length of "perDay", each with an initial value of false.
   This is to track if that per-day use (checkbox) has been checked...  Means you can't break
   the code by checking boxes at the end of the checkboxes first...

   Also, storing that in local storage, I've learned that you have to stringify it in order to store it...
   which, of course, means having to parse it back to an array when grabbing from the json storage.

   Lastly, the showDescription is not set in the .json file, I add it here specifically to know if I
   should be showing the description or not.
*/
onMounted(() => {
  if (character.value.trackedResources) {
    character.value.trackedResources.forEach( resource => {
      const storedUsage = localStorage.getItem(`resource-usage-${resource.name}`);
      resource.usage = storedUsage ? JSON.parse(storedUsage) : new Array(resource.perDay).fill(false);
      resource.showDescription = false;
    });
  }
});
function updateUsage(resource) {
  localStorage.setItem(`resource-usage-${resource.name}`, JSON.stringify(resource.usage));
}
function resetAllResources() {
  character.value.trackedResources.forEach(resource => {
    resource.usage = new Array(resource.perDay).fill(false);
    localStorage.setItem(`resource-usage-${resource.name}`, JSON.stringify(resource.usage));
  });
}
function toggleDescription(resource) {
  resource.showDescription = !resource.showDescription;
}
function toggleStuff( char, effect, activated ) {
  switch( effect ) {
    case "Bloodrage" : {
      char.constitution += 4 * ( activated ? 1 : -1 );
      char.strength += 4 * ( activated ? 1 : -1 );
    }
  }
}
</script>

<template>
    <div class="col-md-8 offset-md-2 col-lg-4 offset-lg-4 col-10 offset-1 mt-3">

      <div class="row my-2 border border-white rounded">
        <div class="col-4 actionLabel text-end rounded-start p-2">Standard Action:</div>
        <select class="col-8 rounded-end bg-dark-subtle" v-model="selectedStandard" :disabled="selectedFullRound !== ''">
          <option v-for="action in filteredStandardActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2 border border-white rounded">
        <div class="col-4 actionLabel text-end rounded-start p-2">Move Action:</div>
        <select class="col-8 rounded-end bg-dark-subtle" v-model="selectedMove" :disabled="selectedFullRound !== ''">
          <option v-for="action in filteredMoveActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2 border border-white rounded">
        <div class="col-4 actionLabel text-end rounded-start p-2">Swift Action:</div>
        <select class="col-8 rounded-end bg-dark-subtle" v-model="selectedSwift" :disabled="selectedFullRound !== ''">
          <option v-for="action in filteredSwiftActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2 border border-white rounded">
        <div class="col-4 actionLabel text-end rounded-start p-2">Full Round Action:</div>
        <select class="col-8 rounded-end bg-dark-subtle" v-model="selectedFullRound"
                :disabled="selectedSwift !== '' || selectedMove !== '' || selectedStandard !== ''">
          <option v-for="action in fullRoundActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2">
        <div class="d-flex justify-content-center mt-3">
          <button class="btn text-white border border-white" @click="resetActions">Reset Actions</button>
        </div>
      </div>

      <div v-if="character.trackedResources.length > 0">
        <hr>
        <div class="card mb-3" v-for="(resource, index) in character.trackedResources" :key="`resource-${index}`">
          <div class="card-header text-white d-flex m-auto w-100" style="background-color: darkslategrey; cursor: pointer" @click="toggleDescription(resource)">
            <input type="checkbox" v-if="resource.showCheckbox" v-model="resource.isActive" @change="toggleStuff(character, resource.name, resource.isActive)">
            <div class="ps-2">{{ resource.name }}</div>
          </div>
          <div class="bg-dark-subtle card-body">
            <div class="d-flex">
              <div class="mx-2" v-for="n in resource.perDay" :key="`use-${index}-${n}`">
                <input type="checkbox" :id="`use-${index}-${n}`" v-model="resource.usage[n-1]" @change="updateUsage(resource)">
                <label :for="`use-${index}-${n}`">{{ n }}</label>
              </div>
            </div>
            <p class="mt-2" v-if="resource.showDescription">{{ resource.description }}</p>
          </div>
        </div>
      </div>

      <div class="row my-2">
        <div class="d-flex justify-content-center mt-3">
          <button class="btn text-white border border-white" @click="resetAllResources">Reset All Resources</button>
        </div>
      </div>


    </div>
</template>

<style scoped>
.actionLabel { background-color: darkslategray; }
select:disabled { background-color: darkslategrey !important; }
.btn { background-color: #101C34; }
</style>