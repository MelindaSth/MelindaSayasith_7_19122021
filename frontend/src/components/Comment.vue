<template>
  <div id="#comments">
    <div class="comment__list">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment__container"
      >
        <p class="comment__container__title">Commentaires :</p>
        <p class="comment__container__content">{{ comment.content }}</p>
        <p>Écrit par {{ comment.author.lastname }}</p>

        <button
          v-if="comment.author.id == userId || isAdmin == true"
          type="button"
          @click="deleteComment(comment.id)"
          class="deletePost__button"
        >
          Supprimer le com
        </button>
      </div>
    </div>

    <div class="addingComment">
      <form>
        <label for="content" class="addingComment__label"
          >Votre commentaire</label
        >
        <div class="addingComment__container">
          <textarea
            type="text"
            id="content"
            name="content"
            rows="3"
            class="addingComment__textarea"
            v-model="content"
            placeholder="Insérer votre commentaire"
          ></textarea>
          <button v-on:click="createComment()">click</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script >
export default {
  name: "Comments",
  data() {
    return {
      comments: [],
      content: "",
      userId: localStorage.getItem("userId"),
      isAdmin: "false",
    };
  },
  // Passer des données aux composants enfants avec les props
  props: {
    postId: Number,
    postUserId: Number,
  },
  mounted() {
    // Get comment pour un post
    let url = `http://localhost:3000/api/comment/${this.postId}`;
    let urlUser = `http://localhost:3000/api/users/${localStorage.getItem("userId")}`;
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
      });
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        this.comments = data;
        console.log(data)
      })
      .catch((error) => console.log(error));
  },
  methods: {
    // Post a comment - créer un comment
    createComment() {
      let inputContent = {
        content: this.content,
        userId: Math.abs(localStorage.getItem("userId")),
        postId: this.postId,
      };
      let url = "http://localhost:3000/api/comment";
      let options = {
        method: "POST",
        body: JSON.stringify(inputContent),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.content = {};
          } else {
            alert("Commentaire envoyé");
          }
        })
        .then(window.location.reload())
        .catch((error) => console.log(error));
    },
    deleteComment(id) {
      let urlComment = `http://localhost:3000/api/comment/${id}`
      let options = {
      method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(urlComment, options)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
    }
  },
};
</script>

<style lang="css">
.comment__container {
  border-radius: 10px;
  box-shadow: 0 0 5px rgb(8 7 16 / 50%);
  padding: 25px;
  margin-bottom: 10px;
}
.comment__container__title {
  margin-bottom: 10px;
}
.comment__container__content {
  font-style: italic;
  margin-left: 10px;
  color: grey;
}
.addingComment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addingComment__label {
  display: flex;
  margin-top: 15px;
  font-size: 15px;
  font-weight: 500;
}
.addingComment__container {
  display: flex;
}
</style>