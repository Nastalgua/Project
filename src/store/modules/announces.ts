import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import firebase from 'firebase/app';
import 'firebase/auth';

export interface Announcement {
  _id: string;
  title: string;
  author: firebase.UserInfo | null;
  body: string;
  going: number;
  category: string;
}

export const categories = ['Food', 'Clothing', 'Vaccine'];

@Module({ name: 'announces' })
export default class Announces extends VuexModule {
  announcements: Announcement[] = [
    {
      _id: 'ok',
      title: 'Food Drive',
      author: null,
      body: 'Get some food during these hard times.',
      going: 0,
      category: 'Food'
    },
    {
      _id: '2sds',
      title: 'Clothing Drive',
      author: null,
      body: 'Get some clothes during these cold times.',
      going: 0,
      category: 'Clothing'
    },
  ];

  @Mutation
  SET_ANNOUNCEMENTS(announcements: Announcement[]) {
    this.announcements = announcements;
  }
}