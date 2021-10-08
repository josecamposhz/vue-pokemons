const apiURL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemons = () => {
    return fetch(`${apiURL}?limit=151`)
}

const getPokemonByName = (name) => {
    return fetch(`${apiURL}/${name}`)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max));
}

const getRandomPokemons = (pokemons) => {
    const indexes = [];

    while (indexes.length < 4) {
        let index = getRandomInt(pokemons.length);
        if (!indexes.includes(index)) {
            indexes.push(index);
        }
    }

    return indexes.map(index => ({ ...pokemons[index], id: index + 1 }));
}

export default {
    getPokemons,
    getPokemonByName,
    getRandomPokemons
}