<template>
        <div class="blocsignup">
            <h2>Connexion @ Groupomania</h2>
            <form v-on:submit.prevent="login" id="form-login" >
              <div class="form-group">
                <label for="email">E-mail :</label>
                <input type="email" id="email" name="email" class="form-control" required v-model="inputLogin.email"/>
              </div>
              <div class="form-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" class="form-control" required v-model="inputLogin.password"/>
              </div>   
              <button type="submit">Connect</button>                                     
            </form> 
             <nav class="navlogsign"><p>Pas encore inscrit ? <router-link to="/signup">Rejoignez-nous !</router-link></p></nav>
        </div>  
</template>


<script>
export default {
    name: 'Login',
    data() {
        return {
            inputLogin: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            let dataToLogin = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password
            }
            console.log(dataToLogin)
            let url = "http://localhost:3000/api/login"
            let request = {
                method: "POST",
                body: JSON.stringify(dataToLogin),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(request);
            fetch(url, request)
                .then(res => res.json())
                .then((res) => {
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("token", res.token)
                        this.$router.push("feed");
                        alert("Vous êtes en ligne !");
                    } else {
                        alert("Attention, mot de passe erroné !");
                    }
                })
                .catch(error => console.log(error))
        }
    }
}
</script>