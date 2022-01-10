<template>
  <section>
    <Navbar></Navbar>
    <div class="account">
      <div class="account__title">
        <h2>Mon compte</h2>
        <button @click="deleteAccount" class="button__delete__account">
          <font-awesome-icon icon="fa-regular fa-trash-alt" />
        </button>
      </div>
<div class="account__container">
      <div class="account__container__element">
          <div class="account__container__infos">
            <p>Nom :</p>
            <p v-if="this.show.lastname == false" class="account_user">
              {{ userAccount.lastname }}
            </p>
            <div
              v-if="this.show.lastname == true"
              class="account__content__input"
            >
              <input v-model="modifyInput.lastname" placeholder="Nouveau nom" />
              <button
                class="button"
                type="button"
                v-on:click="UpdateUser({ lastname: modifyInput.lastname })"
              >
                <font-awesome-icon icon="fa-regular fa-paper-plane" />
              </button>
            </div>
          </div>
          <button v-on:click="changeName()" class="button__modify">
            <font-awesome-icon icon="fa-regular fa-edit" />
          </button>
        </div>

        <div class="account__container__element">
          <div class="account__container__infos">
            <p>Prénom :</p>
            <div
              v-if="this.show.firstname == false"
              class="account__content__input"
            >
              <p class="account_user">{{ userAccount.firstname }}</p>
            </div>
            <div
              v-if="this.show.firstname == true"
              class="account__content__input"
            >
              <input
                v-model="modifyInput.firstname"
                placeholder="Nouveau prénom"
              />
              <button
                class="button"
                type="button"
                v-on:click="UpdateUser({ firstname: modifyInput.firstname })"
              >
                <font-awesome-icon icon="fa-regular fa-paper-plane" />
              </button>
            </div>
          </div>
          <button v-on:click="changeFirstname()" class="button__modify">
            <font-awesome-icon icon="fa-regular fa-edit" />
          </button>
        </div>

        <div class="account__container__element">
          <div class="account__container__infos">
            <p>E-mail :</p>
            <div v-if="this.show.email == false" class="account__content__input">
              <p class="account_user">{{ userAccount.email }}</p>
            </div>
            <div v-if="this.show.email == true" class="account__content__input">
              <input
                v-model="modifyInput.email"
                placeholder="Nouvel e-mail"
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
              />
              <button
                class="button"
                type="button"
                v-on:click="UpdateUser({ email: modifyInput.email })"
              >
                <font-awesome-icon icon="fa-regular fa-paper-plane" />
              </button>
            </div>
          </div>
          <button v-on:click="changeEmail()" class="button__modify">
            <font-awesome-icon icon="fa-regular fa-edit" />
          </button>
        </div>

        <div class="account__container__element">
          <div class="account__container__infos">
            <p class="account_user">Fonction :</p>
            <div v-if="this.show.poste == false" class="account__content__input">
              <p>{{ userAccount.jobtitle }}</p>
            </div>
            <div v-if="this.show.poste == true" class="account__content__input">
              <input
                name="jobtile"
                id="jobtitle"
                v-model="modifyInput.jobtitle"
                placeholder="Nouvelle fonction"
              />
              <button
                class="button"
                type="button"
                v-on:click="UpdateUser({ jobtitle: modifyInput.jobtitle })"
              ></button>
            </div>
          </div>
          <button v-on:click="changeJobtitle()" class="button__modify">
            <font-awesome-icon icon="fa-regular fa-edit" />
          </button>
        </div>
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
        posts: [],
        comments: [],
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
        this.userAccount.posts = data.posts;
        this.userAccount.comments = data.comments
      })
      .catch((error) => console.log(error));
  },
  methods: {
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
           window.location.reload();
         })
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

<style scoped>
.account {
  font-family: "roboto";
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
  width: 100%;
}
.account__content__input {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
}
.account__container {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.account__container__element {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
}
.account_user {
  margin: 10px;
}
.account__container__element .button {
  background-color: white;
  border-radius: 15px;
  border: 2px solid #333029;
  cursor: pointer;
  font-family: "roboto";
  font-size: 14px;
  padding: 12px 16px;
}
.button__delete__account, .button__modify {
  background-color: white;
  border-radius: 15px;
  border: 2px solid #333029;
  cursor: pointer;
  font-family: "roboto";
  font-size: 14px;
  padding: 12px 16px;
}
.button__delete__account, .button__modify:hover {
  background-color: #8b5258;
  color: white;
}
.button__delete__account, .button__modify:active {
  position: relative;
  top: 1px;
}
</style>