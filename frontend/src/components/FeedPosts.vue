<template>
  <div>
    <AddPost/>
    <div v-for="post in posts" :key="post.id" class="feed">
      <div class="feed__content">
        <h4 class="feed__content__title">{{ post.title }}</h4>
        <div class="feed__content__container">
          <p class="feed__content__text">" {{ post.content }} "</p>
          <div v-if="post.imageUrl != 'http://localhost:3000/images/undefined'">
            <img
              :src="post.imageUrl"
              alt="Image du post"
              class="feed__content__img"
            />
          </div>
          <div v-else>
          </div>
        </div>
      </div>
      <p class="feed_content__postby">
        Posté par {{ post.author.lastname }} {{ post.author.firstname }}
        <button
          v-if="post.author.id == userId || isAdmin == true"
          type="button"
          @click="deletePost(post.id)"
          class="button"
        >
          <font-awesome-icon icon="fa-regular fa-trash-alt"/>
        </button>
      </p>
      <div class="actions__deletePost">
      </div>
      <Comment :postId="post.id" :postUserId="post.userId"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import AddPost from "./AddPost.vue";

export default {
  name: "FeedPosts",
  components: {
    Comment,
    AddPost,
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
  display: flex;
  margin: 20px;
  padding: 20px;
  flex-direction: column;
  background-color: #1b2d4a;
  color: #f4f7f9;
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
.feed__content__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 5px rgb(8 7 16 / 50%);
  padding: 25px;
  background-color: white;
}
.feed__content__text {
  padding: 20px 0px 20px 0px;
  color: #1b2d4a;
}
.feed__content__img {
  max-width: 150px;
  max-height: 150px;
  object-fit: cover;
}
.feed_content__postby {
  margin: 10px;
  text-align: right;
  font-size: 15px;
}

</style>