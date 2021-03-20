import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Authentication } from './store';
import { firestorePlugin } from 'vuefire';

import vClickOutside from 'v-click-outside';

Vue.use(firestorePlugin);
Vue.use(vClickOutside);

Vue.config.productionTip = false;

let app: Vue | null;

firebase.auth().onAuthStateChanged(async (user: any) => {
  
  if (!app) {
    if (user) await Authentication.SET_USER(user);

    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});