<template>
        <div>    
            <!-- Répondre  -->
            <div class="blocanswer">
                <textarea type="text" id="content" name="content" rows="2" class="form-control" v-model="content" 
                placeholder="Insérer votre nom puis votre commentaire svp..."></textarea>
                <a v-on:click="createComment()"><i class="far fa-paper-plane" title="Envoyer"></i></a>          
            </div>

        <!-- Liste des réponses  -->
                <div> 
                    <div v-for="comment in comments" :key="comment.id" class="blocanswers" >                        
                        <p> {{ comment.content }} </p>           
                    </div>
                </div>
        </div>
</template>


<script >
export default {
    name: "Comments",
    data() {
        return {
            comment: "",
            comments: [],
        }
    },
    //Passer des données aux composants enfants avec les props//
    props: {
        postId: Number,
        postUserId: Number,
    },
    mounted() {
        ///////////////////GET ANSWERS/////////////////////
        let url = "http://localhost:3000/api/comments/" + this.postId + "/display";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.comments = data;
                console.log(this.comments)
            })
            .catch(error => console.log(error))
    },
    methods: {
        ///////////////////CREATE ANSWER///////////////////// 
        createComment() {
            let inputContent = {
                "content": this.content,
                "postId": this.postId
            }
            let url = "http://localhost:3000/api/comments/new"
            let options = {
                method: "POST",
                body: JSON.stringify(inputContent),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.ok) {
                        this.content = {}
                    } else {
                        alert("Commentaire envoyé 🖅");
                    }
                })
                .then(window.location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>