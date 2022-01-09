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

<style lang="css">
.button {
  background-color: white;
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;
  font-family: 'roboto';
  font-size: 14px;
  padding: 12px 16px;
  text-shadow: 0px 1px 0px #ffffff;
}
.button:hover {
  background-color: #8b5258;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>