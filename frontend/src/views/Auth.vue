<template>
    <section>
            <Login v-if="!showLogin"></Login> 
            <Signup v-if="showLogin"></Signup>
            <div class="create" v-if="!showLogin">
             <p>Pas encore de compte ?</p>
             <button type="button" class="create__button" v-on:click="loginDisplay">Créez un compte</button>   
            </div>
            <div class="create" v-if="showLogin">
             <p>Vous avez déjà un compte ?</p>
             <button type="button" class="create__button" v-on:click="loginDisplay">Connectez-vous !</button>   
            </div>
            
    </section>
    
</template>

<script>
import Login from "../components/Login.vue" 
import Signup from "../components/Signup.vue"

export default {
    name: "Auth",
    components: {
        Login,
        Signup,
    },
    data() {
        return {
            showLogin: false
        }
    },
    methods: {
        loginDisplay() {
            if (this.showLogin) {
                this.showLogin = false;
            } else {
                this.showLogin = true;
            }
        }
    }
}
</script>

<style>
.create {
    bottom: 0;
    display: flex;
    font-size: 1.5em;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding-bottom: 25px;
}
.create__button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: black;
    font-style: italic;
    font-size: 1em;
}
</style>