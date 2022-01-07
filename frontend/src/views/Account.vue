<template>
     <section>
         <Navbar></Navbar>

            <div class="blocsignup">
                <h2>Gestion du compte de {{ userAccount.firstname }} {{ userAccount.lastname }}</h2>
                <p>Vous êtes {{ userAccount.jobtitle }} chez Groupomania.</p>
                <ul>
                    <li>Nom : {{ userAccount.lastname }}</li>
                    <li>Prénom : {{ userAccount.firstname }}</li>
                    <li>Email : {{ userAccount.email }}</li>
                </ul>
                <button @click="deleteAccount" class="accountbutton">Supprimez votre compte</button>  
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
                lastname: "",
                firstname: "",
                jobtitle: "",
                email: ""
            }
        }
    },
    mounted() {
        let url = `http://localhost:3000/api/users/${ localStorage.getItem("userId") }`;
        console.log(url);
        console.log(localStorage.getItem("userId"))
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