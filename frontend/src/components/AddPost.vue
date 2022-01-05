<template>
  <section>
    <div class="blocAddPost">
      <h2>Exprimez-vous ! Partagez !</h2>
      <form id="form-signup">
        <div class="form-group">
          <label for="title">Titre du message :</label>
          <input
            type="text"
            id="title"
            name="title"
            class="form-control"
            required
            v-model="inputPost.title"
          />
        </div>
        <div class="form-group">
          <label for="content">Contenu :</label>
          <textarea
            type="text"
            id="content"
            name="content"
            rows="10"
            class="form-control"
            required
            v-model="inputPost.content"
          ></textarea>
        </div>

        <div class="button">
          <input
            type="file"
            @change="onFileChange"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/gif"
          />
          <button type="submit" id="envoi" class="btn btn-danger">
            Envoyer
          </button>
        </div>
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
      inputPost: {
        title: "",
        content: "",
        gifFile: "",
      },
      userId: "",
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    console.log(this.userId);
  },
  methods: {
    sendPost() {
      let deliverPost = {
        title: this.inputPost.title,
        content: this.inputPost.content,
        userId: this.userId,
        image: this.gifFile,
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
        // .then((res) => res.json())
        .then((res) => {
          res.json();
          console.log(res);
          if (res.ok) {
            const data = res.json();
            console.log(data);
            this.post = data;
            console.log(this.post);
            window.location.reload();
            this.inputPost = {}; // Retour à 0 des inputs //
          } else {
            alert("Post bien reçu 🖅");
          }
        })
        // .then(this.$router.push("/feed"))
        .catch((error) => console.log(error));
    },
    onFileChange: function(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.gifFile = reader.result
      }
    },
  },
};
</script>

<style lang="css">
.blocAddPost {
    border: 8px solid black;
    border-radius: 20px;
}
</style>