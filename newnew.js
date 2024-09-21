const divdata = document.getElementById('creature-info');
const userInput = document.getElementById('entrada')
const leftbutton = document.getElementById('left')
const rightbutton = document.getElementById('right')

var temporaryId = 0

const creatureTypeImg = {
    normal: 'NormalIC_XY.png',
    fire: 'FireIC_XY.png',
    water: 'WaterIC_XY.png',
    electric: 'ElectricIC_XY.png',
    grass: 'GrassIC_XY.png',
    ice: 'IceIC_XY.png',
    fighting: 'FightingIC_XY.png',
    poison: 'PoisonIC_XY.png',
    ground: 'GroundIC_XY.png',
    flying: 'FlyingIC_XY.png',
    psychic: 'PsychicIC_XY.png',
    bug: 'BugIC_XY.png',
    rock: 'RockIC_XY.png',
    ghost: 'GhostIC_XY.png',
    dragon: 'DragonIC_XY.png',
    dark: 'DarkIC_XY.png',
    steel: 'SteelIC_XY.png',
    fairy: 'FairyIC_XY.png'
};

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040B0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B6BC',
};

async function getCreature(inputSet) {
    const url = 'https://pokeapi.co/api/v2/pokemon/'+inputSet;
    const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/'+inputSet;
    try {
        const response = await fetch(url);
        const responseSpecies = await fetch(urlSpecies);
        if(!response.ok || !responseSpecies.ok) {
            throw new Error('Criatura não foi encontrada.');
        }
        const data = await response.json();
        const dataSpecies = await responseSpecies.json()
        temporaryId = data.id
        divBackground(data.types)

        displayCreature(data, dataSpecies);
    } catch (error) {
        displayDino(error.message)
    }
}

function displayCreature(creature, creatureSpecies) {
    if ((creature.height/10) < 1) {
        var CreatureHeight = (creature.height*10)
        var CreatureHeightUnit = 'cm'
    } else {
        var CreatureHeight = (creature.height/10)
        var CreatureHeightUnit = 'm'
    }

    if ((creature.weight/10) < 1) {
        var CreatureWeight = (creature.weight*100)
        var CreatureWeightUnit = 'g'
    } else {
        var CreatureWeight = (creature.weight/10)
        var CreatureWeightUnit = 'kg'
    }

    let currentCreatureType = creature.types.map((type) => {
        const creatureTypeName = type.type.name;
        const imagePath = creatureTypeImg[creatureTypeName];

        return `<img src="extras/${imagePath}" alt="${creatureTypeName}" class="creatureType" />`;
    }).join(' ');

    const speciesName = (Array.from(creatureSpecies.names).find((arrayname) => arrayname.language.name==='en')).name;

    const creatureinfo = `
    <h2>${speciesName} - #${creature.id}</h2>
    <img src='${creature.sprites.front_default}' alt='${creature.name}'/>
    <p>Altura: ${CreatureHeight} ${CreatureHeightUnit}</p>
    <p>Peso: ${CreatureWeight} ${CreatureWeightUnit}</p>
    <p>Tipo(s): ${currentCreatureType} </p>
    `
    divdata.innerHTML = creatureinfo;
}

function displayDino(error) {
    const dinoinfo = `
    <h2>Reginaldo - ???.</h2>
    <img src='extras/dinosaur.png' alt='Reginald'/>
    <p>Altura: ??? </p>
    <p>Peso: ???</p>
    <p>Tipo(s): <img src="extras/${creatureTypeImg['normal']}" alt="normal" class="creatureType" /> </p>
    <sub>Se isso apareceu, é porque houve um erro.</sub>
    <sub>Erro: ${error}</sub>
    `
    console.log(error)
    divdata.innerHTML = dinoinfo;
}

function divBackground(types) {
    console.log(types)
    if (types.length === 0) {
        divdata.style.backgroundColor = '#FFFFFF';
        return;
    }
    
    let colors = [];

    types.forEach((type) => {
        console.log(type.type.name)
        const color = typeColors[type.type.name];
        if (color) {
            colors.push(color);
        }
    });

    if (colors.length === 1) {
        divdata.style.backgroundColor = colors[0];
        divdata.style.backgroundImage = 'none';
    } else {
        // divdata.style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`; // Ficou feio demais kkkkkkkkkkkkkkkkkkkkkkkkkkkk
        divdata.style.backgroundColor = colors[0];
    }
}

function capitalize(string) { // Provavelmente não será mais utilizado.
    return string[0].toUpperCase() + string.slice(1);
}

userInput.addEventListener('keydown', (input) => {
    if (input.key == "Enter") {
        temporaryId = userInput.value.toLowerCase();
        getCreature(temporaryId)
    }
})

leftbutton.addEventListener('click', ()=>{
    if (temporaryId < 1) {
        temporaryId = 0
    } else {
        temporaryId -= 1
        getCreature(temporaryId)
    }
})

rightbutton.addEventListener('click', ()=>{
        temporaryId += 1
        getCreature(temporaryId)
    }
)
