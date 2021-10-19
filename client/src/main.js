import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import store from './store'
import Axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = 'bearer ' + token
}
Vue.config.productionTip = false

Vue.use(Vuelidate)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
