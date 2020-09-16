import Vue from 'vue'
import vuetify from './plugins/vuetify' 
import store from './store/index'
import router from './router/index'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faPause,
  faRecordVinyl,
  faAppleAlt,
  faHeadphones,
  faArrowLeft,
  faArrowRight,
  faCommentAlt,
  faVideo,
  faRandom,
  faRedo,
  faHeart,
  faVolumeUp,
  faVolumeMute,
  faList,
  faWindowClose,
  faEllipsisH,
  faCat,
} from '@fortawesome/free-solid-svg-icons';
library.add(faPlay,
  faPause,
  faRecordVinyl,
  faAppleAlt,
  faHeadphones,
  faArrowLeft,
  faArrowRight,
  faCommentAlt,
  faVideo,
  faRandom,
  faRedo,
  faHeart,
  faVolumeUp,
  faVolumeMute,
  faList,
  faWindowClose,
  faEllipsisH,
  faCat)
  
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
})

