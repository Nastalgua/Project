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
    libraries: 'places',
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

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