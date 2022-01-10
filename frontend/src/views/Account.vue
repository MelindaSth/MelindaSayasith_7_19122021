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
      <p>Nom :</p>
      <p class="account__content__list">{{ userAccount.lastname }}</p>
      <div class="account__content__input">
        <input v-model="modifyInput.lastname" placeholder="Nouveau nom" />
        <button
          class="button"
          type="button"
          v-on:click="UpdateUser({ lastname: modifyInput.lastname })"
        >
          Modifier
        </button>
      </div>
      <p>Prénom :</p>
      <p class="account__content__list">{{ userAccount.firstname }}</p>
      <div class="account__content__input">
        <input v-model="modifyInput.firstname" placeholder="Nouveau prénom" />
        <button
          class="button"
          type="button"
          v-on:click="UpdateUser({ firstname: modifyInput.firstname })"
        >
          Modifier
        </button>
      </div>
      <p>E-mail :</p>
      <p class="account__content__list">{{ userAccount.email }}</p>
      <div class="account__content__input">
        <input v-model="modifyInput.email" placeholder="Nouvel e-mail" />
        <button
          class="button"
          type="button"
          v-on:click="UpdateUser({ email: modifyInput.email })"
        >
          Modifier
        </button>
      </div>
      <p>Poste :</p>
      <p class="account__content__list">{{ userAccount.jobtitle }}</p>
      <div class="account__content__input">
        <select name="jobtile" id="jobtitle" v-model="modifyInput.jobtitle">
          <option value="IT">It</option>
          <option value="Marketing">Marketing</option>
          <option value="CODIR">CODIR</option>
        </select>
        <button
          class="button"
          type="button"
          v-on:click="UpdateUser({ jobtitle: modifyInput.jobtitle })"
        >
          Modifier
        </button>
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
    };
  },
  mounted() {
    let url = `http://localhost:3000/api/users/${localStorage.getItem(
      "userId"
    )}`;
    let request = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(url, request)
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
      let request = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, request)
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
      let request = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      };
      // console.log(url)
      // console.log(request)
      fetch(url, request)
        .then((response) => {
          console.log(response.json());
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    deleteAccount() {
      let url = `http://localhost:3000/api/users/${this.userAccount.userId}`;
      let request = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, request)
        .then((response) => {
          console.log(response);
          localStorage.clear();
          alert("Votre compte est maintenant supprimé !");
        })
        .then(this.$router.push("/signup"))
        .catch((error) => console.log(error));
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
  background-color: #eae0c2;
}
.account__title {
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.account__content__list {
  margin: 20px;
}
.account__content__input {
  border: 2px solid red;
}
</style>