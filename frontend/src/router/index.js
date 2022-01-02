import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/login.vue"
import FeedComponent from "../views/feed.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/login'
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/feed",
            name: "feed",
            component: FeedComponent
        }
    ]
})