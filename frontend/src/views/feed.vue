<template>
  <section>
    <Navbar></Navbar>
    <AddPost></AddPost>
    <div class="blocFeed">
      <h1>Tu es sur le fil d'actualité</h1>
      <FeedPosts></FeedPosts>
    </div>
  </section>
</template>


<script>
import Navbar from '../components/Navbar'
import FeedPosts from '../components/FeedPosts'
import AddPost from "../components/AddPost";

export default {
  name: "Feed",
  components: {
    Navbar,
    FeedPosts,
    AddPost
  },
};
</script>