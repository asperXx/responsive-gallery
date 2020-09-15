import Vue from 'vue';
import App from './App.vue';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueProgressiveImage from 'vue-progressive-image';

Vue.use(VueProgressiveImage);

library.add(faTimes, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

