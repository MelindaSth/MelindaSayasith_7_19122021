import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPaperPlane)
library.add(faTrashAlt)
library.add(faTimesCircle)
library.add(faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')