import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import Feed from '../views/Feed.vue'

Vue.use(VueRouter)
Vue.use(require('vue-moment'));

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,

  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    // Avant l'accès au 'path', vérification si 'userId' est dans le localStorage
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userId')) {
        next()
      } else {
        next({ path: '/'})
      }
    }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    // Avant l'accès au 'path', vérification si 'userId' est dans le localStorage
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userId')) {
        next()
      } else {
        next({ path: '/'})
      }
    }
  }
]

const router = new VueRouter({
  routes
})


export default router