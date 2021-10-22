// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Axios from 'axios'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = 'bearer ' + token
}
Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(Vuelidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: { App },
  template: '<App/>'
})
