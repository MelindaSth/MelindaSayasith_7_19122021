<template>
  <div id="nav">
    <div>
    <button v-on:click="goFeed()" class="button__path">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        id="logo"
        alt="Logo Groupomania"
      />
    </button>  
    </div>

    <nav>
      <router-link to="/feed" title="Liste des messages" class="nav__list"
        ><p>Feed</p></router-link>
      <router-link to="/account" title="Votre compte" class="nav__list"
        ><p>Account</p></router-link>
      <router-link to="/" title="Informations">
      <button @click="deconnect" title="Déconnexion" class="button__disconnect">
          <font-awesome-icon icon="fa-regular fa-times-circle" /></button>
      </router-link>      
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    goFeed() {
      this.$router.push('/feed');
    },
    deconnect() {
      localStorage.clear(); // Nettoyage du localStorage
      this.$router.push("/"); // Changement de route vers "/"
    },
  },
};
</script>

<style lang="css">
#logo {
  width: 200px;
}
#nav {
  font-family: "roboto";
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 20px 20px 20px;
  padding: 10px;
  background-color: #1b2d4a;
}
nav {
  display: flex;
  
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
}
@media (max-width:400px) {
  nav {
    width: 100%;
  }
}
.nav__list {
  color: white;
}
.nav__list:hover {
  color: #8b5258;
}
.button__path {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.button__disconnect {
  background-color: white;
  border-radius: 15px;
  border: 2px solid #333029;
  cursor: pointer;
  font-family: "roboto";
  font-size: 14px;
  padding: 12px 16px;
}
.button__disconnect:hover {
  background-color: #8b5258;
  color: white;
}
.button__disconnect:active {
  position: relative;
  top: 1px;
}
</style>