<script setup>
import { ref } from "vue";
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
</script>

<template>
    <div class="col-md-8 offset-md-2 col-lg-4 offset-lg-4 col-10 offset-1">
      <div class="row my-2">
        <div class="col-4 actionLabel text-end rounded-start p-2">Standard Action:</div>
        <select class="col-8 rounded-end" v-model="selectedStandard" :disabled="selectedFullRound !== ''">
          <option v-for="action in filteredStandardActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2">
        <div class="col-4 actionLabel text-end rounded-start p-2">Move Action:</div>
        <select class="col-8 rounded-end" v-model="selectedMove" :disabled="selectedFullRound !== ''">
          <option v-for="action in filteredMoveActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2">
        <div class="col-4 actionLabel text-end rounded-start p-2">Swift Action:</div>
        <select class="col-8 rounded-end" v-model="selectedSwift" :disabled="selectedFullRound !== ''">
          <option v-for="action in filteredSwiftActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2">
        <div class="col-4 actionLabel text-end rounded-start p-2">Full Round Action:</div>
        <select class="col-8 rounded-end" v-model="selectedFullRound"
                :disabled="selectedSwift !== '' || selectedMove !== '' || selectedStandard !== ''">
          <option v-for="action in fullRoundActions(character)" :value="action.name">{{ action.name }}</option>
        </select>
      </div>

      <div class="row my-2">
        <div class="d-flex justify-content-center mt-3">
          <button class="btn text-white" @click="resetActions">Reset Actions</button>
        </div>
      </div>
    </div>
</template>

<style scoped>
.actionLabel { background-color: darkslategray; }
select:disabled { background-color: grey}
.btn { background-color: #101C34; }
</style>