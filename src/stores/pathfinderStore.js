import { defineStore } from 'pinia';
import { getMaxHPs } from "@/utils";
import axios from 'axios';

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
        incrementHPs() {
            if( this.currentHPs < this.maxHPs) {
                this.currentHPs++;
                localStorage.setItem('currentHPs', this.currentHPs.toString());
            }
        },
        decrementHPs() {
            if( this.currentHPs > 0 ) {
                this.currentHPs--;
                localStorage.setItem('currentHPs', this.currentHPs.toString());
            }
        },
        setCharacter(data) {
            this.character = data;
            const storedCurrentHPs = parseInt(localStorage.getItem('currentHPs'), 10);
            const maxHPs = getMaxHPs(data);

            this.currentHPs = ! isNaN(storedCurrentHPs) && storedCurrentHPs < maxHPs ? storedCurrentHPs : maxHPs;
            this.maxHPs = getMaxHPs(data);
            localStorage.removeItem('characterData');
        },
        loadCharacter(characterName) {
            const name = characterName || localStorage.getItem('characterData')

            localStorage.setItem('characterData', name );
            axios.get(`${name}.json`)
                .then(response => {
                    this.setCharacter(response.data)
                })
                .catch(error => {
                    console.error("Error fetching character data: ", error);
                    localStorage.removeItem('characterData');
                });
            }
    },
});


