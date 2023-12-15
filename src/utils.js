export function modifier(attribute) {
    return Math.floor((attribute - 10) / 2);
}
export function calculateCrit( weapon ) {
    return weapon.criticalChance === 20 ? "20" : weapon.criticalChance + "-20";
}
function chargingPenalty( weapons ) {
    return weapons.some( weapon => weapon.charging ) ? -2 : 0;
}
export function standardAC(char) {
    return 10 + char.armour.ac + modifier(char.dexterity) - chargingPenalty( char.weapons );
}
export function touchAC(char) {
    return 10 + modifier(char.dexterity) - chargingPenalty( char.weapons );
}
export function flatFootedAC(char) {
    return 10 + char.armour.ac + (char.uncannyDodge ? modifier(char.dexterity) : 0) - chargingPenalty( char.weapons );
}
export function initiative(char) {
    return modifier(char.dexterity) + char.initiativeBonus;
}
export function calculateGoodSave(level) {
    return 2 + Math.floor(level / 2);
}
export function calculatePoorSave(level) {
    return Math.floor((level - 1) / 3);
}
export function fortitudeSave(char) {
    return (char.fortGood ? calculateGoodSave(char.level) :
        calculatePoorSave(char.level)) + modifier(char.constitution);
}
export function reflexSave(char) {
    return (char.refGood ? calculateGoodSave(char.level) : calculatePoorSave(char.level)) + modifier(char.dexterity);
}
export function willSave(char) {
    return (char.willGood ? calculateGoodSave(char.level) : calculatePoorSave(char.level)) + modifier(char.wisdom);
}
export function skillBonuses(char) {
    return char.skills.map(skill => {
        let bonus = modifier(char[skill.stat]) + skill.bonus + skill.value;
        if (skill.classSkill && skill.value > 0) {
            bonus += 3; // Add class skill bonus if applicable
        }
        return {
            name: skill.name,
            bonus: bonus >= 0 ? "+" + bonus : bonus,
            usable: skill.usable,
            value: skill.value,
        };
    });
}
export function concentration(char) {
    return char.modifier(char.intelligence);
}
export function getDC(char, spell) {
    return 10 + spell.level + char.modifier(char.intelligence);
}
export function filteredSwiftActions(char) {
    return char.actions.filter(action => action.type === 'Swift');
}
export function filteredMoveActions(char) {
    const separator = {name: '─── Swift Actions ───', isSeparator: true};
    let move = char.actions.filter(action => action.type === 'Move');

    move = move.concat(separator, char.actions.filter(action => action.type === 'Swift'));

    return move;
}
export function filteredStandardActions(char) {
    const moveSeparator = {name: '─── Move Actions ───', isSeparator: true};
    const swiftSeparator = {name: '─── Swift Actions ───', isSeparator: true};
    let standard = char.actions.filter(action => action.type === 'Standard');

    standard = standard.concat(moveSeparator, char.actions.filter(action => action.type === 'Move'));
    standard = standard.concat(swiftSeparator, char.actions.filter(action => action.type === 'Swift'));

    return standard;
}
export function fullRoundActions(char) {
    return char.actions.filter(action => action.type === 'FullRound');
}
export function getMaxHPs(char) {
    const conBonus = modifier(char.constitution) * char.level;
    let hitDiceValue = 6;

    if (/^\d+d\d+$/.test(char.hitDice)) {
        const [numDice, numSides] = char.hitDice.split('d').map(Number);
        hitDiceValue = (Math.floor(numDice / 2) + numDice) * numSides;
    }

    return hitDiceValue + conBonus + char.level;
}
export function calculatedBAB( char ) {
    return Math.floor( char.level * (char.bab+1) * 0.25 );
}
export function calculateHitChance( weapon ) {
    const char = this.character;
    let hitChance = Math.max(modifier(char.strength), modifier(char.dexterity));
    hitChance += calculatedBAB(char);
    if (weapon.powerAttack) {
        hitChance -= 1 + Math.floor(calculatedBAB(char) / 4);
    }
    if (weapon.weaponFocus) hitChance++;
    if (weapon.masterwork) hitChance++;
    if (weapon.charging) hitChance += 2;
    if (weapon.flanking) hitChance += 2;
    if (weapon.energy) hitChance += 1;
    return hitChance;
}
export function calculateDamageBonus( weapon ) {
    const char = this.character;
    let damage = modifier(char.strength);
    if (weapon.powerAttack) {
        damage += 2 * (Math.floor(calculatedBAB(char) / 4) + 1);
    }
    if (weapon.twoHanded) damage = Math.floor(damage * 1.5);
    return damage > 0 ? "+" + damage : damage < 0 ? damage : "";
}
export function cmb(char) {
    return calculatedBAB(char) + Math.max(modifier(char.strength), modifier(char.dexterity));
}
export function cmd(char) {
    return 10 + calculatedBAB(char) + modifier(char.strength) + modifier(char.dexterity) + char.size;
}