import Vue from 'vue'
import App from './App.vue'
import './plugins/font-awesome'
import './plugins/bootstrap'
import '@fortawesome/fontawesome-free'
import store from './store'



Vue.config.productionTip = false

new Vue({
  store:store,
  render: h => h(App),
}).$mount('#app')
