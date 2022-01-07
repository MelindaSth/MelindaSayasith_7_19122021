<template>
  <section>
    <Navbar></Navbar>
    <AddPost></AddPost>
    <FeedPosts></FeedPosts>
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