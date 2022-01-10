import Vue from 'vue'
import VueRouter from 'vue-router'
import Account from '../views/Account.vue'
import Feed from '../views/Feed.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)
Vue.use(require('vue-moment'));

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
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