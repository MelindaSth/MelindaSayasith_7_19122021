<template>
  <div id="#comments">
    <div class="comment__list">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment__container"
      >
        <p class="comment__container__title">Réaction :</p>
        <p class="comment__container__content">{{ comment.content }}</p>
        <p class="comment__container_postby">
          Écrit par {{ comment.author.lastname
          }}<button
            v-if="comment.author.id == userId || isAdmin == true"
            type="button"
            @click="deleteComment(comment.id)"
            class="button"
          >
            <font-awesome-icon icon="fa-regular fa-trash-alt" />
          </button>
        </p>
      </div>
    </div>

    <div class="addingComment" v-if="addComment">
      <form>
        <label for="content" class="addingComment__label"
          ></label
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
          <button v-on:click="createComment()" class="button">
            <font-awesome-icon icon="fa-regular fa-paper-plane" />
          </button>
        </div>
      </form>
    </div>

    <button v-if="addComment" v-on:click="showAddComment()" class="button">
      Fermer
    </button>
        <button v-if="!addComment" v-on:click="showAddComment()" class="button">
      Commentez !
    </button>

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
      isAdmin: false,
      addComment: false
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
      });
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        this.comments = data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    showAddComment() {
      if (this.addComment) {
        this.addComment = false;
      } else {
        this.addComment = true;
      }
    },
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
      let urlComment = `http://localhost:3000/api/comment/${id}`;
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(urlComment, options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css">
.comment__container {
  border-radius: 10px;
  box-shadow: 0 0 5px rgb(8 7 16 / 50%);
  padding: 25px;
  margin-bottom: 10px;
  background-color: #b5b2ae;
}
.comment__container__title {
  margin-bottom: 10px;
  color: #1b2d4a;
}
.comment__container__content {
  font-style: italic;
  margin-left: 10px;
  color: white;
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
.comment__container_postby {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>