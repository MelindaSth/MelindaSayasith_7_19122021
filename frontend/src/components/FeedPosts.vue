<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="feed">
      <div class="feed__content">
        <h4 class="feed__content__title">{{ post.title }}</h4>
        <p class="feed__content__text">" {{ post.content }} "</p>
        <img :src="post.imageUrl" alt="Image du post">
      </div>
      <p class="feed_content__postby">
        Posté par {{ post.author.lastname }} {{ post.author.firstname }}
      </p>
      <div class="actions__deletePost">
        <button
          v-if="post.author.id == userId || isAdmin == true"
          type="button"
          @click="deletePost(post.id)"
          class="deletePost__button"
        >
          Supprimer le post
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
      isAdmin: false,
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
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
    fetch(urlUser, request)
      .then((response) => response.json())
      .then((data) => {
        this.isAdmin = data.isAdmin;
      })
      .catch((error) => console.log(error));
    fetch(urlPost, request)
      .then((response) => response.json())
      .then((data) => {
        this.posts = data.posts;
      })
      .catch((error) => console.log(error));
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
      let urlComment = `http://localhost:3000/api/comment/post/${postId}`;
      fetch(urlComment, request)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
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
.feed {
  font-family: "roboto";
  border-radius: 10px;
  box-shadow: 0 0 40px rgb(8 7 16 / 60%);
  display: flex;
  margin: 20px;
  padding: 20px;
  flex-direction: column;
}
.feed__content__title {
  font-size: 25px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.feed__content__text {
  border-radius: 10px;
  box-shadow: 0 0 5px rgb(8 7 16 / 50%);
  padding: 25px;
}
.feed_content__postby {
  margin: 10px;
  text-align: right;
  font-size: 15px;
}
.deletePost__button {
  margin: 10px;
}
</style>