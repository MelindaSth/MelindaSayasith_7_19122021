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

        <label for="file"> Media :</label>
        <input
          type="file"
          class="addingPost__input"
          name="file"
          id="file"
          ref="file"
          @change="selectFile"
        />

        <button v-on:click.prevent="sendPost()">Envoyer</button>
      </form>
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
        file: "",
      },
      id: Math.abs(localStorage.getItem("userId")),
    };
  },
  methods: {
    selectFile() {
      this.inputPost.file = this.$refs.file.files[0];
      console.log(this.inputPost.file);
    },
    sendPost() {
      let url = "http://localhost:3000/api/posts";
      const data = {
        title: this.inputPost.title,
        content: this.inputPost.content,
        userId: Math.abs(localStorage.getItem("userId")),
        imageUrl: this.inputPost.file.name,
      };
      console.log(data);
      let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error);
        });      
      let UrlUploadPhoto = "http://localhost:3000/api/images";
      let fd = new FormData()
      fd.append('file' ,this.inputPost.file)
      let optionsFile = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: fd
      }
      fetch(UrlUploadPhoto, optionsFile)
        .then((res) => {
          console.log(res)
          // window.location.reload()
      })
      .catch((error) => {
          console.log(error);
        }); 
    },
  }
}
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