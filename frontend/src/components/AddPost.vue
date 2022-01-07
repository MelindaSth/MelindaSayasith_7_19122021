<template>
  <section>
    <div class="blocAddPost">
      <h2>Exprimez-vous ! Partagez !</h2>
      <form id="form-signup" enctype="multipart/form-data">
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

<!-- <div>
<input type="file" name="file" @change="onFileSelected">
<button @click="onUpload">YO</button>
</div> -->

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
// onFileSelected(event) {
//   this.selectedFile = event.target.files[0];
// },
// onUpload() {
//   const fd = new FormData();
//   fd.set("image", this.selectedFile, this.selectedFile.name);
// },
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
    // upload(event) {
    //   let data = new FormData();
    //   let file = event.target.files[0];
    //   data.set("image", file);
    // },
  },
};
</script>

<style lang="css">
</style>