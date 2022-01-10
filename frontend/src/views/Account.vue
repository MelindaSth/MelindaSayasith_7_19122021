<template>
  <section>
    <Navbar></Navbar>
    <div class="account">
      <h2 class="account__title">
        Mon compte
        <button @click="deleteAccount" class="button">
          <font-awesome-icon icon="fa-regular fa-trash-alt" />
        </button>
      </h2>
      <div class="account__container__element">
        <p>Nom :</p>
        <div v-if="this.show.lastname == false">
          <p class="account__content__list">{{ userAccount.lastname }}</p>
        </div>
        <div v-if="this.show.lastname == true" class="account__content__input">
          <input v-model="modifyInput.lastname" placeholder="Nouveau nom" />
          <button
            class="button"
            type="button"
            v-on:click="UpdateUser({ lastname: modifyInput.lastname })"
          > <font-awesome-icon icon="fa-regular fa-paper-plane" />
          </button>
        </div>
        <button v-on:click="changeName()" class="button">Modifier</button>
      </div>
      <div class="account__container__element">
        <p>Prénom :</p>
        <div
          v-if="this.show.firstname == false"
          class="account__content__input"
        >
          <p class="account__content__list">{{ userAccount.firstname }}</p>
        </div>
        <div v-if="this.show.firstname == true" class="account__content__input">
          <input v-model="modifyInput.firstname" placeholder="Nouveau prénom" />
          <button
            class="button"
            type="button"
            v-on:click="UpdateUser({ firstname: modifyInput.firstname })"
          ><font-awesome-icon icon="fa-regular fa-paper-plane" />
          </button>
        </div>
        <button v-on:click="changeFirstname()" class="button">Modifier</button>
      </div>
      <div class="account__container__element">
        <p>E-mail :</p>
        <div v-if="this.show.email == false" class="account__content__input">
          <p class="account__content__list">{{ userAccount.email }}</p>
        </div>
        <div v-if="this.show.email == true" class="account__content__input">
          <input v-model="modifyInput.email" placeholder="Nouvel e-mail" />
          <button
            class="button"
            type="button"
            v-on:click="UpdateUser({ email: modifyInput.email })"
          ><font-awesome-icon icon="fa-regular fa-paper-plane" />
          </button>
        </div>
        <button v-on:click="changeEmail()" class="button">Modifier</button>
      </div>
      <div class="account__container__element">
        <p>Poste :</p>
        <div v-if="this.show.poste == false" class="account__content__input">
          <p class="account__content__list">{{ userAccount.jobtitle }}</p>
        </div>
        <div v-if="this.show.poste == true" class="account__content__input">
          <select name="jobtile" id="jobtitle" v-model="modifyInput.jobtitle">
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Direction">Direction</option>
            <option value="RH">RH</option>
            <option value="Finance">Finance</option>
          </select>
          <button
            class="button"
            type="button"
            v-on:click="UpdateUser({ jobtitle: modifyInput.jobtitle })"
          >
          </button>
        </div>
        <button v-on:click="changeJobtitle()" class="button">Modifier</button>
      </div>
    </div>
  </section>
</template>

<script >
import Navbar from "../components/Navbar";
export default {
  name: "Account",
  components: {
    Navbar,
  },
  data() {
    return {
      userAccount: {
        userId: localStorage.getItem("userId"),
        firstname: "",
        lastname: "",
        email: "",
        jobtitle: "",
      },
      inputAccount: {
        jobtitle: "",
        email: "",
      },
      modifyInput: {
        lastname: "",
        firstname: "",
        jobtitle: "",
        email: "",
      },
      show: {
        lastname: false,
        firstname: false,
        email: false,
        poste: false,
      },
    };
  },
  mounted() {
    let url = `http://localhost:3000/api/users/${localStorage.getItem(
      "userId"
    )}`;
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        this.userAccount.firstname = data.firstname;
        this.userAccount.lastname = data.lastname;
        this.userAccount.email = data.email;
        this.userAccount.jobtitle = data.jobtitle;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    getOneAccount() {
      let url = `http://localhost:3000/api/auth/${this.userAccount.userId}`;
      let options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.userAccount.firstname = data.firstname;
          this.userAccount.lastname = data.lastname;
          this.userAccount.jobtitle = data.jobtitle;
          this.userAccount.email = data.email;
        })
        .catch((error) => console.log(error));
    },
    UpdateUser(content) {
      let url = `http://localhost:3000/api/users/${this.userAccount.userId}`;
      let options = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      };
      fetch(url, options)
        .then((response) => {
          console.log(response.json());
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    deleteAccount() {
      let url = `http://localhost:3000/api/users/${this.userAccount.userId}`;
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, options)
        .then((response) => {
          console.log(response);
          localStorage.clear();
          alert("Votre compte est maintenant supprimé, à bientôt !");
        })
        .then(this.$router.push("/signup"))
        .catch((error) => console.log(error));
    },
    changeName() {
      if (this.show.lastname == false) {
        this.show.lastname = true;
      } else {
        this.show.lastname = false;
      }
    },
    changeFirstname() {
      if (this.show.firstname) {
        this.show.firstname = false;
      } else {
        this.show.firstname = true;
      }
    },
    changeEmail() {
      if (this.show.email) {
        this.show.email = false;
      } else {
        this.show.email = true;
      }
    },
    changeJobtitle() {
      if (this.show.poste) {
        this.show.poste = false;
      } else {
        this.show.poste = true;
      }
    },
  },
};
</script>

<style lang="css">
.account {
  font-family: "roboto";
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 20px;
  padding: 15px;
  background-color: #b5b2ae;
}
.account__title {
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.account__content__list {
  margin: 10px;
}
.account__content__input {
  display: flex;
  margin-bottom: 10px;
}
.account__container__element {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin: 10px;
}
.button {
  background-color: white;
  border-radius: 15px;
  border: 2px solid #333029;
  cursor: pointer;
  font-family: "roboto";
  font-size: 14px;
  padding: 12px 16px;
}
.button:hover {
  background-color: #8b5258;
  color: white;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>