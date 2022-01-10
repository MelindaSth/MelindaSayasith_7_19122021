<template>
  <div>
    <div class="feed__content">
      <h4 class="feed__content__title">{{ title }}</h4>
      <div v-if="edit == false" class="feed__content__container">
        <p class="feed__content__text">" {{ content }} "</p>
        <div v-if="imageUrl != 'http://localhost:3000/images/undefined'">
          <img :src="imageUrl" alt="Image du post" class="feed__content__img" />
        </div>
      </div>
      <div v-if="edit">
        <AddPost :modify="true" :postId="postId"></AddPost>
      </div>
      <Comment :postId="postId" :postUserId="postUserId"></Comment>
    </div>
    <p class="feed_content__postby">Posté par {{ firstname }}</p>
    <div class="feed__button__container">
      <button
        v-if="postAuthorId == userId || this.isAdmin == true"
        type="button"
        @click="deletePost(postId)"
        class="button"
      >
        <font-awesome-icon icon="fa-regular fa-trash-alt" />
      </button>
      <button
        v-if="postAuthorId == userId || this.isAdmin == true"
        type="button"
        @click="showEdit()"
        class="button"
      >
        Modifier Post
      </button>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import AddPost from "./AddPost.vue";

export default {
  name: "Posts",
  components: {
    Comment,
    AddPost,
  },
  data() {
    return {
      // Data en globalité
      userId: localStorage.getItem("userId"),
      edit: false,
      isAdmin: false,
    };
  },
  // Passage des données aux composants enfants avec les props
  props: {
    title: String,
    content: String,
    lastname: String,
    firstname: String,
    imageUrl: String,
    postAuthorId: Number,
    postId: Number,
    postUserId: Number,
  },
  mounted() {
    let urlUser = `http://localhost:3000/api/users/${localStorage.getItem(
      "userId"
    )}`;
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(urlUser, options)
      .then((response) => response.json())
      .then((data) => {
        this.isAdmin = data.isAdmin;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    showEdit() {
      if (this.edit == false) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    },
    // Suppression du Post
    deletePost(postId) {
      let url = `http://localhost:3000/api/posts/${postId}`;
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      let urlComment = `http://localhost:3000/api/comment/post/${postId}`;
      fetch(urlComment, options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
      fetch(url, options)
        .then((response) => {
          console.log(response);
          alert("Suppression du message confirmé !");
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
  padding: 10px;
  margin-bottom: 10px;
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
.feed__button__container {
    display: flex;
    justify-content: flex-end;
}
.editMessage {
  width: 80%;
  height: 150px;
}
</style>