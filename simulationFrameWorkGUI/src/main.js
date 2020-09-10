import Vue from 'vue'
import vuetify from './plugins/vuetify' 
import store from './store/index'
import router from './router/index'
import App from './App.vue'


new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
})

