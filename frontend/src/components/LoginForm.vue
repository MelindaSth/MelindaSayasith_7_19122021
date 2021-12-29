<template>
  <form @submit.prevent="submit()">
    <p v-if="errorMessage" class="error"></p>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button type="submit">Se Connecter</button>
  </form>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    submit() {
      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.error { color: red; font-size: 70px; }
</style>