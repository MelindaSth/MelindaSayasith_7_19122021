<template>
  <nav id="nav">
    <img src="../assets/logo.png" id="logo" alt="Logo Groupomania" />
    <router-link to="/feed" title="Liste des messages" class="nav__list"><p>Feed</p></router-link>
    <router-link to="/account" title="Votre compte" class="nav__list"><p>Account</p></router-link>
    <router-link to="/infos" title="Informations" class="nav__list"><p>Infos</p></router-link>
    <router-link to="/" title="Informations"><button @click="deconnect" class="fas fa-door-open" title="Déconnexion">Déconnexion</button></router-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    deconnect() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="css">
#logo {
  width: 100px;
}
#nav {
  font-family: 'roboto';
  border-radius: 10px;
  box-shadow: 0 0 40px rgb(8 7 16 / 60%);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
}
</style>