<template>
  <div class="login">
      <h1><img src="../assets/icon-left-font-monochrome-black.png" id="logo" alt="Logo Groupomania" /></h1>
          <h2 id="login__title">Connexion
    </h2>
    <form v-on:submit.prevent="login" id="login__form">
      <div>
        <label for="email" class="login__label">E-mail :</label>
        <input
          type="email"
          id="email"
          name="email"
          class="login__input"
          placeholder="E-mail"
          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
          required
          v-model="inputLogin.email"
        />
      </div>
      <div>
        <label for="password" class="login__label">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          class="login__input"
          placeholder="Mot de passe"
          required
          v-model="inputLogin.password"
        />
      </div>
      <button type="submit" class="login__button">Connexion</button>
    </form>
  </div>
</template>


<script>
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
  methods: {
    login() {
      let dataToLogin = {
        email: this.inputLogin.email,
        password: this.inputLogin.password,
      };
      let url = "http://localhost:3000/api/login";
      let options = {
        method: "POST",
        body: JSON.stringify(dataToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.userId && res.token) {
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            this.$router.push("feed");
            alert("Vous êtes en ligne !");
          } else {
            alert("Attention, mot de passe faux !");
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css">
* {
  margin: 0;
  box-sizing: border-box;
}
.signup {
  width: 100%;
}
.login {
  font-family: "roboto";
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
  border-radius: 10px;
  padding: 15px 35px;
  width:100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.login h1 {
  margin: 25px;
}

#signup__form {
  margin: auto;
  width: 100%;
  max-width: 300px;
}
#login__title {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login__label {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
}
.login__input {
  display: block;
  height: 50px;
  width: 100%;
  max-width: 500px;
  min-width: 300px;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
.login__button {
  margin-top: 50px;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.signup__invitation {
  font-size: 18px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}
</style>