import Vue from 'vue'
import App from './App.vue'
import './plugins/font-awesome';
import './plugins/bootstrap'
import '@fortawesome/fontawesome-free';
import './plugins/movable'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
