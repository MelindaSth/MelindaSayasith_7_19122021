<template>
  <div class="blocsignup">
    <h2>Connexion @ Groupomania</h2>
    <form v-on:submit.prevent="login" id="form-login">
      <div class="form-group">
        <label for="email">E-mail :</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          required
          v-model="inputLogin.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          required
          v-model="inputLogin.password"
        />
      </div>
      <button type="submit">Connect</button>
    </form>
    <nav class="navlogsign">
      <p>
        Pas encore inscrit ?
        <router-link to="/signup">Rejoignez-nous !</router-link>
      </p>
    </nav>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      inputLogin: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    axios
      .post("http://localhost:3000/api/signup")
      .then((res) => res.json())
      .catch((error) => console.log(error));
  },
  methods: {
    login() {
      let dataToLogin = {
        email: this.inputLogin.email,
        password: this.inputLogin.password,
      };
      console.log(dataToLogin);
      this.$router.push("feed");
      alert("Bienvenue chez Groupomania, tu es connecté !");
    },
  },
};
</script>