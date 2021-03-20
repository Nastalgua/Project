import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

// modules
import authentication from './modules/authentication';
import announces from './modules/announces';

export interface Link {
  name: string;
  to?: string;
  show?: boolean;
  showCB?: Function;
  callback?: Function;
}

Vue.use(Vuex);

export enum STATES {
  BROWSE,
  CREATE
}

const store = new Vuex.Store({
  state: {
    currState: STATES.BROWSE
  },
  mutations: {
    UPDATE_CURR_STATE(state, newState) {
      state.currState = newState;
    }
  },
  actions: {
    updateCurrState(context, newState) {
      context.commit('UPDATE_CURR_STATE', newState);
    }
  },
  modules: {
    authentication,
    announces
  }
});

export const Authentication = getModule(authentication, store);
export const Announces = getModule(announces, store);

export default store;