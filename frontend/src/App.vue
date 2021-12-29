<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <NavBar />
    <router-view/>

    <p>{{ $store.getters.formattedDate }}</p>
    <button @click="incrementMonth">Incrémenter</button>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { mapGetters, mapActions  } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters(["formattedDate"]),
  },
  methods: {
    ...mapActions(["incrementMonth"]),
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
