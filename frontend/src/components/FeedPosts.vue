<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="blocFeed">
      <div class="blocmessage">
        <h4><i class="fas fa-angle-double-right"></i> {{ post.title }}</h4>
        <h5 class="pmessage">
          <i class="fas fa-angle-right"></i>" {{ post.content }} "
        </h5>
      </div>
      <p>{{ post.author.lastname }} {{ post.author.firstname }}</p>
      <div class="blocactions">
        <button
          v-if="post.author.id == userId || isAdmin == true"
          type="button"
          @click="deletePost(post.id)"
          class="accountbutton"
        >
          Supprimez
        </button>
      </div>
      <Comment :postId="post.id" :postUserId="post.userId"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
export default {
  name: "FeedPosts",
  components: {
    Comment,
  },
  data() {
    return {
      // Data dans sa globalité
      posts: [],
      userId: localStorage.getItem("userId"),
      isAdmin: "",
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    let urlPost = "http://localhost:3000/api/posts";
    let urlUser = `http://localhost:3000/api/users/${localStorage.getItem(
      "userId"
    )}`;
    let request = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(urlPost, request)
      .then((response) => response.json())
      .then((data) => {
        this.posts = data.posts;
      })
      .catch((error) => console.log(error));
    fetch(urlUser, request)
      .then((response) => response.json())
      .then((data) => {
        this.isAdmin = data.isAdmin;
      });
  },
  methods: {
    // Suppression du Post
    deletePost(postId) {
      let url = `http://localhost:3000/api/posts/${postId}`;
      let request = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, request)
        .then((response) => {
          console.log(response);
          alert("Suppression du message confirmé ! 😢");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css">
</style>