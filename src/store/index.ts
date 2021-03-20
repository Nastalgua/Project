import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

// modules
import authentication from './modules/authentication';

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
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication
  }
});

export const Authentication = getModule(authentication, store);

export default store;