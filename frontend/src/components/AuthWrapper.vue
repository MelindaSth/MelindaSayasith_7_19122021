<template>
  <div>
    <App v-if="user"/>
    <LoginForm v-else :errorMessage="errorMessage" @submit="login" />
  </div>
</template>

<script>
import { login } from "../authentication";
import App from "../App.vue";
import LoginForm from "./LoginForm.vue";

export default {
  data() {
    return {
      user: null,
      errorMessage: ""
    };
  },

  methods: {
    login({ email, password }) {
      this.user = login(email, password);
      this.errorMessage = this.user ? "" : "Connexion échouée";
    }
  },

  components: { App, LoginForm }
};
</script>