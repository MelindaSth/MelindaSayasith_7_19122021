<template>
  <section>
    <div class="addingPost">
      <h2 id="addingPost__title">Partagez votre humeur...</h2>

      <form id="addingPost__form" enctype="multipart/form-data">
        <label for="title" class="addingPost__label">Titre du message :</label>
        <input
          type="text"
          id="title"
          name="title"
          class="addingPost__input"
          required
          v-model="inputPost.title"
        />

        <label for="content" class="addingPost__label">Contenu :</label>
        <textarea
          type="text"
          id="content"
          name="content"
          rows="10"
          class="addingPost__input"
          required
          v-model="inputPost.content"
        ></textarea>
      </form>
      <button v-on:click="sendPost">Envoyer</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Post",
  components: {},
  data() {
    return {
      selectedFile: null,
      inputPost: {
        title: "",
        content: "",
        file: "",
      },
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    sendPost() {
      let deliverPost = {
        title: this.inputPost.title,
        content: this.inputPost.content,
        userId: Math.abs(localStorage.getItem("userId")),
      };
      console.log(deliverPost);
      let url = "http://localhost:3000/api/posts";
      let options = {
        method: "POST",
        body: JSON.stringify(deliverPost),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => {
          console.log(res);
          window.location.reload();
          this.inputPost = {}; // Retour à 0 des inputs //
        })
        .catch((error) => {
          console.log(error);
        });
      //     .then(this.$router.push("/feed"))
      //     .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="css">
.addingPost {
  font-family: "roboto";
  border-radius: 10px;
  box-shadow: 0 0 40px rgb(8 7 16 / 60%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  padding: 20px;
}
#addingPost__title {
  font-size: 25px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.addingPost__label {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
}
.addingPost__input {
  display: block;
  height: 50px;
  width: 100%;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
</style>