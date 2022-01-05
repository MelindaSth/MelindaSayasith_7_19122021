<template>
        <nav id="navbar">
            <router-link to="/feed" title="Liste des messages"><p>Feed</p></router-link>
            <router-link to="/account" title="Votre compte"><p>Account</p></router-link>
            <router-link to="/infos" title="Informations"><p>Infos</p></router-link>
            <router-link to="/" title="Informations"><i @click="deconnect" class="fas fa-door-open" title="Déconnexion"></i></router-link>
        </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        deconnect() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>

<style lang="css">
#navbar {
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 8px solid black;
    border-radius: 20px;
}
</style>