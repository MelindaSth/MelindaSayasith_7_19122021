<template>
  <div id="#comments">
    <div class="blocComments">
      <div v-for="comment in comments" :key="comment.id" class="blocanswers">
        <p>{{ comment.content }}</p>
      </div>
    </div>

    <div class="blocanswer">
      <form>
        <label for="content">Votre commentaire</label>

        <textarea
          type="text"
          id="content"
          name="content"
          rows="2"
          class="form-control"
          v-model="content"
          placeholder="Insérer votre commentaire svp..."
        ></textarea>

        <button v-on:click="createComment()">
          click<i class="far fa-paper-plane" title="Envoyer"></i>
        </button>
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
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        this.comments = data;
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
            alert("Commentaire envoyé 🖅");
          }
        })
        .then(window.location.reload())
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css">
</style>