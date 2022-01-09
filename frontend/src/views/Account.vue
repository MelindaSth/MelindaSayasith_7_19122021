<template>
     <section>
         <Navbar></Navbar>
            <div class="account">
                <h2 class="account__title">Mon compte <button @click="deleteAccount" class="button"><font-awesome-icon icon="fa-regular fa-trash-alt" /></button>  </h2>
                    <p>Nom :</p>
                    <p class="account__content__list">{{ userAccount.lastname }}</p>
                    <p>Prénom :</p>
                    <p class="account__content__list">{{ userAccount.firstname }}</p>
                    <p>E-mail :</p>
                    <p class="account__content__list">{{ userAccount.email }}</p>
                    <p>Poste :</p>
                    <p class="account__content__list">{{ userAccount.jobtitle }}</p>
                <h2 class="account__title">Modifier mon compte</h2>
                    <form  @submit.prevent="updateUser()" enctype="multipart/form-data">
                        <div>
                            <p>E-mail :</p>
                            <input type="text" name="email" id="email" placeholder="Nouvel e-mail" v-model="inputAccount.email"><button v-on:click.prevent="updateUser()" class="button"><font-awesome-icon icon="fa-regular fa-paper-plane"/></button>
                        </div>
                        <div>
                            <p>Poste :</p>
                            <input type="text" name="jobtitle" id="jobtitle" placeholder="Nouveau poste" v-model="inputAccount.jobtitle"><button v-on:click.prevent="updateUser()" class="button"><font-awesome-icon icon="fa-regular fa-paper-plane"/></button>
                        </div>
                    </form>
            </div>  
     </section>
</template>

<script >
import Navbar from '../components/Navbar'
export default {
    name: 'Account',
    components: {
        Navbar
    },
    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                firstname: "",
                lastname: "",
                email: "",
                jobtitle: ""
            },
            inputAccount: {
                jobtitle: "",
                email: ""
            }
        }
    },
    mounted() {
        let url = `http://localhost:3000/api/users/${ localStorage.getItem("userId") }`;
        let request = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, request)
            .then(response => response.json())
            .then(data => {
                this.userAccount.firstname = data.firstname;
                this.userAccount.lastname = data.lastname;
                this.userAccount.email = data.email;
                this.userAccount.jobtitle = data.jobtitle;
            })
            .catch(error => console.log(error))
    },
    methods: {
        getOneAccount() {
            let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
            let request = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, request)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.userAccount.firstname = data.firstname;
                    this.userAccount.lastname = data.lastname;
                    this.userAccount.jobtitle = data.jobtitle;
                    this.userAccount.email = data.email;
                })
                .catch(error => console.log(error))
        },
        updateUser() {
            const formData = new FormData();
            formData.append("userId", parseInt(localStorage.getItem("userID")));
            formData.append("email", this.userAccount.email);
            formData.append("jobtitle", this.userAccount.jobtitle);

            let url = `http://localhost:3000/api/users/${ this.userAccount.userId }`;
            let request = {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                }
            };
            console.log(url)
            console.log(request)
            fetch(url, formData, request)
                .then((response) => console.log(response.json()))
                .catch(error => console.log(error))
        },
        deleteAccount() {
            let url = `http://localhost:3000/api/users/${ this.userAccount.userId }`;
            let request = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, request)
                .then((response) => {
                    console.log(response);
                    localStorage.clear();
                    alert("Votre compte est maintenant supprimé !");
                })
                .then(this.$router.push("/signup"))
                .catch(error => console.log(error))
        },
    },
} 
</script>

<style lang="css">
.account {
  font-family: 'roboto';
  border-radius: 10px;
  display: flex;
  flex-direction: column;;
  justify-content: space-evenly;
  margin: 20px;
  background-color: #eae0c2;
}
.account__title {
    border: solid 2px red;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.account__content__list {
    border: solid 2px green;
    margin: 20px;
}
</style>