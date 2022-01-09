<template>
  <nav id="nav">
    <img src="../assets/icon-left-font-monochrome-white.png" id="logo" alt="Logo Groupomania" />
    <router-link to="/feed" title="Liste des messages" class="nav__list"><p>Feed</p></router-link>
    <router-link to="/account" title="Votre compte" class="nav__list"><p>Account</p></router-link>
    <router-link to="/infos" title="Informations" class="nav__list"><p>Infos</p></router-link>
    <router-link to="/" title="Informations"><button @click="deconnect" title="Déconnexion" class="button"><font-awesome-icon icon="fa-regular fa-times-circle"/></button></router-link>
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
  width: 250px;
}
#nav {
  font-family: 'roboto';
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  padding: 10px;
  background-color: #1b2d4a;
}
.nav__list {
  color: white;
}
.nav__list:hover {
  color: #8b5258;
}
</style>