<template>
  <div class="register">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="username">Email :</label>
          <input type="text" name="username" v-model="form.username" />
        </div>
        <div>
          <label for="first_name">Prénom :</label>
          <input type="text" name="first_name" v-model="form.first_name" />
        </div>
        <div>
          <label for="last_name">Nom :</label>
          <input type="text" name="last_name" v-model="form.last_name" />
        </div>
        <div>
          <label for="password">Code :</label>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Go !</button>
      </form>
    </div>
    <p v-if="showError" id="error">Email déjà actif !</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: "",
        first_name: "",
        last_name: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/posts");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
#error {
  color: red;
}
</style>