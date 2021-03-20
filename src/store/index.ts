import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '@/firebase';

// modules
import authentication from './modules/authentication';
import announces from './modules/announces';
import map from './modules/map';

export interface Link {
  name: string;
  to?: string;
  show?: boolean;
  showCB?: Function;
  callback?: Function;
}

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    announcements: []
  },
  mutations: vuexfireMutations,
  actions: {
    bindAnnouncementsRef: firestoreAction(context => {
      return context.bindFirestoreRef('announcements', db.collection('announcements'));
    })
  },
  modules: {
    authentication,
    announces,
    map
  }
});

export const Authentication = getModule(authentication, store);
export const Announces = getModule(announces, store);
export const Map = getModule(map, store);

export default store;