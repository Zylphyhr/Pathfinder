<script setup>
  import { usePathfinderStore } from '@/stores/pathfinderStore';
  import { storeToRefs } from "pinia";
  import {getDC, concentration} from "@/utils";

  const store = usePathfinderStore();
  const { spells } = storeToRefs( store );
</script>

<template>
  <div class="tab-pane fade" id="spells" role="tabpanel" aria-labelledby="spells-tab">
    <div class="container-fluid bg-dark text-white mt-3 col-lg-8 offset-lg-2 col-12">
      <div class="row">
        <div class="col-md-4" v-for="spell in spells" :key="spell.name">
          <div class="card m-2">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div>{{ spell.name }}</div><div>Level {{ spell.level }}</div>
              </div>
              <div class="d-flex justify-content-between" style="font-size: 0.8em;" >
                <div >({{ spell.school }})</div><div>DC {{ getDC(spell) }}</div>
              </div>
              <div class="card-body bg-dark text-white">
									<span class="card-text" style="font-size: 0.9em;">
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
              <hr class="card-text"/>{{ spell.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
