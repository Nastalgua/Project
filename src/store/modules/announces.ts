import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Loc } from './map';

type LocCircle = {
  location: Loc;
  radius: number;
}

export interface Announcement {
  _id: string;
  title: string;
  authorId: string;
  body: string;
  date: string;
  going: Array<string>;
  category: string;
  location: LocCircle;
  imgLink?: string;
  website?: string;
  phoneNumber?: string;
  venue?: string;
}

export const categories = ['Food', 'Clothing', 'Vaccine'];

@Module({ name: 'announces' })
export default class Announces extends VuexModule {
  fetchedAnnouncements = false;
  currFilters: string[] = [];

  @Mutation
  TRUE_FETCHED_ANNOUNCEMENTS() {
    this.fetchedAnnouncements = true;
  }

  @Mutation
  ADD_FILTER(filter: string) {
    this.currFilters.push(filter);
  }

  @Mutation
  REMOVE_FILTER(filter: string) {
    this.currFilters = this.currFilters.filter(str => str !== filter);
  }
}