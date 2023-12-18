// Note to Add: if (character.trackedResources.some(resource => resource.name.includes("Rage") && resource.isActive)) {
export function hasProperty( char, name ) {
    return char.trackedResources.some(resource => resource.name.includes( name ) && resource.isActive)
}
export function chargingPenalty( char ) {
    return char.weapons.some( weapon => weapon.charging ) ? -2 : 0;
}
export function acPenalty( char ) {
    let penalty = 0;
    penalty += hasProperty( char, "Bloodrage" ) ? 2 : 0;
    penalty += chargingPenalty( char );

    return penalty;
}
export function modifier(attribute) {
    return Math.floor((attribute - 10) / 2);
}
export function standardAC(char) {
    return 10 + char.armour.ac + modifier(char.dexterity) - acPenalty(char);
}
export function touchAC(char) {
    return 10 + modifier(char.dexterity) - acPenalty(char);
}
export function flatFootedAC(char) {
    return 10 + char.armour.ac + (char.uncannyDodge ? modifier(char.dexterity) : 0) - acPenalty(char);
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
    let bonus = modifier(char.constitution);
    bonus += hasProperty( char, "Archaeologist’s Luck" ) ? 1 : 0;
    bonus += char.characterClass === "Paladin" && char.level > 1 ? char.charisma : 0;

    return (char.fortGood ? calculateGoodSave(char.level) :
        calculatePoorSave(char.level)) + bonus;
}
export function reflexSave(char) {
    let bonus = modifier(char.dexterity);
    bonus += hasProperty( char, "Archaeologist’s Luck" ) ? 1 : 0;
    bonus += char.characterClass === "Paladin" && char.level > 1 ? char.charisma : 0;
    return (char.refGood ? calculateGoodSave(char.level) : calculatePoorSave(char.level)) + bonus;
}
export function willSave(char) {
    let bonus = modifier(char.wisdom);
    bonus += hasProperty( char, "Archaeologist’s Luck" ) ? 1 : 0;
    bonus += char.characterClass === "Paladin" && char.level > 1 ? char.charisma : 0;
    bonus += hasProperty( char, "Bloodrage" ) ? 2 : 0;
    return (char.willGood ? calculateGoodSave(char.level) : calculatePoorSave(char.level)) + bonus;
}
export function skillBonuses(char) {
    return char.skills.map(skill => {
        let bonus = modifier(char[skill.stat]) + skill.bonus + skill.value;
        if (skill.classSkill && skill.value > 0) {
            bonus += 3; // Add class skill bonus if applicable
        }
        if( hasProperty( char, "Archaeologist’s Luck" ) ) bonus += 1;
        return {
            name: skill.name,
            bonus: bonus >= 0 ? "+" + bonus : bonus,
            usable: skill.usable,
            value: skill.value,
        };
    });
}
export function concentration(char) {
    return modifier(char.intelligence) + char.level;
}
export function getDC(char, spell) {
    return 10 + spell.level + modifier(char.intelligence);
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
    let ret = Number(char.hitDice.match(/^d(\d+)$/)[1]);  // Start with max HPs at 1st level
    ret += (char.level - 1) * ( Math.floor( ret/2 ) +1 ); // Each additional level, 1/2HPs +1.
    ret += modifier(char.constitution) + char.level;      // Con bonus and Favored Class
    return ret;
}
export function calculatedBAB( char ) {
    return Math.floor( char.level * (char.bab+1) * 0.25 );
}
export function calculateCrit( weapon ) {
    return weapon.criticalChance === 20 ? "20" : weapon.criticalChance + "-20";
}
export function calculateHitChance( weapon, char ) {
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
    if( hasProperty( char, "Archaeologist’s Luck" ) ) hitChance += 1;
    if( hasProperty( char, "Smite Evil" ) ) hitChance += modifier(char.charisma);
    return hitChance;
}
export function calculateDamageBonus( weapon, char ) {
    let damage = modifier(char.strength);
    if (weapon.powerAttack) {
        damage += 2 * (Math.floor(calculatedBAB(char) / 4) + 1);
    }
    if (weapon.twoHanded) damage = Math.floor(damage * 1.5);
    if( hasProperty( char, "Archaeologist’s Luck" ) ) damage += 1;
    if( hasProperty( char, "Smite Evil" ) ) damage += char.level;
    return damage > 0 ? "+" + damage : damage < 0 ? damage : "";
}
export function getDamageBase( weapon, char ) {
    let ret = weapon.baseDamage;
    if( hasProperty( char, "Bloodrage" ) && weapon.name === "Claws" ) ret = "(x2 Attack Rolls) - 1d6";
    if( hasProperty( char, "Elemental Assault" ) ) ret += " +1d6(Fire)";
    if( hasProperty( char, "Elemental Strike" ) ) ret += " +1d6(Fire)";
    if( hasProperty( char, "Sneak Attack" ) ) ret += " +"+Math.floor( ( char.level +1 ) / 2 )+"d6(Precision)";
    return ret;
}
export function cmb(char) {
    return calculatedBAB(char) + Math.max(modifier(char.strength), modifier(char.dexterity));
}
export function cmd(char) {
    return 10 + calculatedBAB(char) + modifier(char.strength) + modifier(char.dexterity) + char.size;
}