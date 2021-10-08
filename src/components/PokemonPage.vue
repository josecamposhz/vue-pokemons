<template>
  <section class="container">
      <h1>¿Quién es este pokemon?</h1>
    <h3>Puntuación: {{ points }}</h3>
    <div v-if="pokemon">
      <img
        :src="imgSrc"
        :alt="pokemon.name"
        style="max-height: 350px"
        class="my-3"
        :class="{ 'fade-in': showAnswer, 'hidden-pokemon': !showAnswer }"
      />
    </div>

    <div class="options-container">
      <button
        class="btn btn-primary"
        v-for="pokemon in options"
        :key="pokemon.name"
        @click="checkAnswer(pokemon.name)"
        :disabled="showAnswer"
      >
        {{ pokemon.name }}
      </button>
    </div>
    <div v-if="showAnswer">
      <div class="my-3 alert" :class="answerClass" role="alert">
        <h2 class="fade-in my-3">{{ message }}</h2>
      </div>
      <button class="btn btn-info" @click="newGame">Nuevo Juego</button>
    </div>
  </section>
</template>

<script>
import pokemonApi from "@/services/pokemonApi";
export default {
  data() {
    return {
      pokemons: [],
      options: [],
      pokemon: null,
      showAnswer: false,
      selected: null,
      message: "",
      points: 0,
    };
  },
  computed: {
    answerClass() {
      return {
        "alert-danger": this.selected !== this.pokemon.name,
        "alert-success": this.selected === this.pokemon.name,
      };
    },
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemon.id}.svg`;
    },
  },
  mounted() {
    this.getPokemons();
  },
  methods: {
    async getPokemons() {
      const resp = await pokemonApi.getPokemons();
      const data = await resp.json();
      this.pokemons = data.results;
      this.mixPokemonArray();
    },
    mixPokemonArray() {
      this.options = pokemonApi.getRandomPokemons(this.pokemons);
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.options[rndInt];
    },
    checkAnswer(name) {
      this.showAnswer = true;
      this.selected = name;
      if (this.pokemon.name === name) {
        this.points += 10;
        this.message = `Correcto, ${this.pokemon.name}`;
      } else {
        this.points -= 10;
        this.message = `Incorrecto, el pokemon era ${this.pokemon.name}`;
      }
    },
    newGame() {
      console.log("Cargando el nuevo juego...");
      this.showAnswer = false;
      this.selected = null;
      this.mixPokemonArray();
    },
  },
};
</script>

<style scoped>
.hidden-pokemon {
  filter: brightness(0);
}
.alert,
.options-container {
  margin: auto;
  max-width: 600px;
}
.options-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fade-in {
  animation: fadeIn 0.3s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>