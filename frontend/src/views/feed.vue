<template>
  <section>
    <Navbar></Navbar>
    <button
      v-if="showAddPost"
      type="button"
      v-on:click="showAddPostButton()"
      class="button"
    >
      Fermer
    </button>
    <button
      v-if="!showAddPost"
      type="button"
      v-on:click="showAddPostButton()"
      class="button"
    >
      Ajoutez votre Post !
    </button>
    <div v-if="showAddPost">
      <AddPost></AddPost>
    </div>
    <div v-for="post in posts" :key="post.id" class="feed">
      <Posts
        :title="post.title"
        :content="post.content"
        :lastname="post.author.lastname"
        :firstname="post.author.firstname"
        :postAuthorId="post.author.id"
        :imageUrl="post.imageUrl"
        :postId="post.id"
        :postUserId="post.userId"
      ></Posts>
    </div>
  </section>
</template>


<script>
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import AddPost from "../components/AddPost.vue";

export default {
  name: "Feed",
  components: {
    AddPost,
    Navbar,
    Posts,
  },
  data() {
    return {
      posts: [],
      userId: localStorage.getItem("userId"),
      showAddPost: false,
      isAdmin: false,
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    let urlPost = "http://localhost:3000/api/posts";
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(urlPost, options)
      .then((response) => response.json())
      .then((data) => {
        this.posts = data.posts;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    showAddPostButton() {
      if (this.showAddPost) {
        this.showAddPost = false;
      } else {
        this.showAddPost = true;
      }
    },
  },
};
</script>

<style lang="css">
.button {
  background-color: white;
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;
  font-family: "roboto";
  font-size: 14px;
  padding: 12px 16px;
  text-shadow: 0px 1px 0px #ffffff;
}
.button:hover {
  background-color: #8b5258;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>