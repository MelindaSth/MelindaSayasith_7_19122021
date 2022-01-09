<template>
  <div class="signup">
    <h2 id="signup__title">Inscription</h2>
    <form v-on:submit.prevent="signup" id="signup__form">
      <label for="lastname" class="signup__label">Nom :</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        class="signup__input"
        placeholder="Nom"
        required
        pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
        v-model="inputSignup.lastname"
      />
      <label for="firstname" class="signup__label">Prénom :</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        class="signup__input"
        placeholder="Prénom"
        required
        pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
        v-model="inputSignup.firstname"
      />

      <label for="jobtitle" class="signup__label">Fonction :</label>
      <input
        type="text"
        id="jobtitle"
        name="jobtitle"
        class="signup__input"
        placeholder="Intitulé du poste de travail"
        required
        pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
        v-model="inputSignup.jobtitle"
      />

      <label for="email" class="signup__label">E-mail :</label>
      <input
        type="email"
        id="email"
        name="email"
        class="signup__input"
        placeholder="E-mail"
        required
        pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
        v-model="inputSignup.email"
      />

      <label for="password" class="signup__label">Mot de passe :</label>
      <input
        type="password"
        id="password"
        name="password"
        class="signup__input"
        placeholder="Mot de passe"
        required
        pattern="(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
        v-model="inputSignup.password"
      />
      <p class="signup__info">
        Minimum 5 caractères dont 1 Majuscule, 1 minuscule et un chiffre
      </p>
      <button class="signup__button">Inscription</button>
    </form>

    <nav class="login__invitation">
      <p>
        Vous avez déjà un compte ?
        <router-link to="/">Connectez-vous</router-link>
      </p>
    </nav>
  </div>
</template>


<script>
export default {
  name: "Signup",
  data() {
    return {
      inputSignup: {
        lastname: "",
        firstname: "",
        jobtitle: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      let dataToSignup = {
        lastname: this.inputSignup.lastname,
        firstname: this.inputSignup.firstname,
        jobtitle: this.inputSignup.jobtitle,
        email: this.inputSignup.email,
        password: this.inputSignup.password,
      };
      // console.log(dataToSignup);
      let url = "http://localhost:3000/api/signup";
      let request = {
        method: "POST",
        body: JSON.stringify(dataToSignup),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(request);
      fetch(url, request)
        .then((res) => res.json())
        .then(() => {
          this.$router.push("/");
          alert(
            " Bienvenue sur Groupomania Connect ! Connectez-vous dès à présent !"
          );
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
  font-family: "roboto";
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  box-shadow: 0 0 40px rgb(8 7 16 / 60%);
  padding: 15px 35px;
}
#signup__title {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup__label {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
}
.signup__input {
  display: block;
  height: 50px;
  width: 100%;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
.signup__button {
  margin-top: 50px;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.signup__info {
  font-size: 10px;
}
.login__invitation {
  font-size: 18px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}
</style>