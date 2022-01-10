<template>
  <section>
    <div class="addingPost">
      <h2 v-if="!modify" id="addingPost__title">Partagez votre humeur...</h2>
      <h2 v-if="modify" id="addingPost__title">Modifier votre post</h2>

      <form id="addingPost__form" enctype="multipart/form-data">
        <label v-if="!modify" for="title" class="addingPost__label"
          >Titre du message :</label
        >
        <label v-if="modify" for="title" class="addingPost__label"
          >Nouveau titre :</label
        >
        <input
          type="text"
          id="title"
          name="title"
          class="addingPost__input"
          required
          v-model="inputPost.title"
        />

        <label v-if="!modify" for="content" class="addingPost__label"
          >Contenu :</label
        >
        <label v-if="modify" for="content" class="addingPost__label"
          >Nouveau Contenu :</label
        >
        <textarea
          type="text"
          id="content"
          name="content"
          rows="10"
          class="addingPost__input"
          required
          v-model="inputPost.content"
        ></textarea>

        <label v-if="!modify" for="file"></label>
        <input
          v-if="!modify"
          type="file"
          class="file-upload-button"
          name="file"
          id="file"
          ref="file"
          @change="selectFile"
        />

        <button v-if="!modify" v-on:click.prevent="sendPost()" class="button">
          <font-awesome-icon icon="fa-regular fa-paper-plane" />
        </button>
        <button v-if="modify" v-on:click.prevent="modifyPost()" class="button">
          <font-awesome-icon icon="fa-regular fa-paper-plane" />
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Post",
  props: {
    modify: Boolean,
    postId: Number,
  },
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
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      let UrlUploadPhoto = "http://localhost:3000/api/images";
      let fd = new FormData();
      fd.append("file", this.inputPost.file);
      let optionsFile = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: fd,
      };
      fetch(UrlUploadPhoto, optionsFile).then(() => {
        window.location.reload();
      });
    },
    modifyPost() {
      let url = `http://localhost:3000/api/posts/${this.postId}`;
      const data = {
        title: this.inputPost.title,
        content: this.inputPost.content,
      };
      console.log(data);
      let options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="css">
.addingPost {
  font-family: "roboto";
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #b5b2ae;
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
.addingPost__form .button {
}
</style>