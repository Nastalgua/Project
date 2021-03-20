import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import router from '../../router';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Link } from '../index';

@Module({ name: 'authentication' })
export default class Authentication extends VuexModule {
  user: firebase.UserInfo | null = null;

  @Mutation
  SET_USER(user: firebase.UserInfo | null) {
    this.user = user;
  }
}