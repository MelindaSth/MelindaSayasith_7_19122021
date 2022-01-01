<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/posts">Fil d'Actualité</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Se déconnecter</a>
    </span>
    <span v-else>
      <router-link to="/register">S'inscrire</router-link> |
      <router-link to="/login">Se connecter</router-link>
    </span>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>