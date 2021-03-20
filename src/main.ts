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
import VCalendar from "v-calendar";
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(firestorePlugin);
Vue.use(vClickOutside);
Vue.use(VCalendar);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API,
    libraries: 'places, drawing',
  },
  autobindAllEvents: false,
  installComponents: true
});

Vue.config.productionTip = false;

let app: Vue | null;

firebase.auth().onAuthStateChanged(async (user) => {
  if (!app) {
    if (user) await Authentication.SET_USER(user);

    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});