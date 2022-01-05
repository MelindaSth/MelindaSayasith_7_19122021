<template>
<div>
      <div v-for="post in posts" :key="post.id" class="blocFeed">
          <div class="blocauthor">
              <h3><i class="far fa-user-circle"></i> {{ post.user.firstname }} {{ post.user.lastname }} </h3>
              <div class="blocjob">  
                  <p><i class="far fa-building"></i> {{ post.user.jobtitle }} </p>  
                  <p><i class="far fa-clock"></i> {{ post.createdAt | moment("DD.MM.YY HH:mm") }} </p>
              </div>
          </div>
          <div class="blocmessage">
              <h4><i class="fas fa-angle-double-right"></i>  {{ post.title }} </h4>
              <h5 class="pmessage"><i class="fas fa-angle-right"></i>"  {{ post.content }} "</h5>
          </div>  
          <div class="blocactions">
                <button v-if="post.userId == userId || isAdmin == true" 
                type="button" @click="deletePost(post.id)" class="accountbutton">Supprimez </button>
          </div>
       
        <Comments :postId="post.id" :postUserId="post.userId" />
      </div>   
  </div>

</template>

<script>
import Comments from "../components/Comment.vue"
export default {
    name: "FeedPosts",
    components: {
        Comments
    },
    data() {
        return {
            firstname: "",
            lastname: "",
            jobtitle: "",
            userId: "",
            isAdmin: "",
            messages: []
        }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        console.log(localStorage);
        let url = "http://localhost:3000/api/posts";
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
                this.posts = data;
                console.log(this.posts)

            })
            .catch(error => console.log(error))
    },
    methods: {
        ///////////////////DELETE MESSAGE/////////////////////
        deletePost(postId) {
            let url = `http://localhost:3000/api/posts/${ postId }`;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Suppression du message confirmé ! 😢");
                    window.location.reload();
                })
                .catch(error => console.log(error))
        },
    },
}
</script>

<style lang="css">
.blocFeed {
    border: 8px solid black;
    border-radius: 20px;
}
</style>