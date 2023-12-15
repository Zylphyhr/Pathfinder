import { defineStore } from 'pinia';
import { getMaxHPs } from "@/utils";

export const usePathfinderStore = defineStore( 'pathfinderStore', {
    state: () => {
        const char = null;
        const maxHPs = 0;

        return {
            character: char,
            currentHPs: maxHPs,
            maxHPs: maxHPs,
        };
    },
    actions: {
        incrementHPs() { if( this.currentHPs < this.maxHPs) this.currentHPs++; },
        decrementHPs() { if( this.currentHPs > 0          ) this.currentHPs--; },
        setCharacter(data) {
            this.character = data;
            this.currentHPs = getMaxHPs(data);
            this.maxHPs = getMaxHPs(data);
        }
    },
});


