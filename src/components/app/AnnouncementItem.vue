<template>
  <div class="announcement-item">
    <div @click="viewItem()" style="width: 100%; height: 100%">
      <div class="content">
        <h2 id="title">{{ announcement.title }}</h2>
        <div id="author">By {{ username }}</div>
        <p id="body">{{ this.body }}</p>
      </div>
      <div class="bottom-left">
        <img class="item" width="20px" height="20px" src="@/assets/general/clock.svg"/>
        <div class="item">{{ date }}</div>
      </div>
    </div>
    <div class="bottom-right">
      <img class="item" 
        v-if="isGoing" 
        width="32px" 
        height="32px" 
        src="@/assets/general/go.svg" 
        @click="debounceGoing(true)" />
      <img class="item" 
        v-if="!isGoing" 
        width="32px" 
        height="32px" 
        src="@/assets/general/no-go.svg" 
        @click="debounceGoing(false)" />
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Announcement } from '@/store/modules/announces';
import router from "@/router";
import { db } from "@/firebase";
import store, { Authentication } from "@/store";
import { debounce } from "debounce";

type User = {
  username: string;
}

@Component({
  methods: {
    debounceGoing: debounce(function(this: any, condition: boolean) {
      this.changeToGoing(condition);
    }, 800)
  }
})
export default class AnnouncementItem extends Vue {
  @Prop() announcement!: Announcement;
  username = '';

  async mounted() {
    this.username = await this.getAuthor();
  }

  get isGoing() {
    if (!Authentication.user) return false;
    return this.announcement.going.includes((Authentication.user.uid as string));
  }

  get date() {
    const date = this.announcement.date;

    return `${date.substring(0, 2)}/${date.substring(2, 4)}/${date.substring(4, 6)}`;
  }

  get body() {
    return this.removeTags(this.announcement.body);
  }

  async changeToGoing(condition: boolean) {
    if (!Authentication.user?.uid) return;

    if (!condition) {
      this.announcement.going.push(Authentication.user.uid);
    } else {
      this.announcement.going = this.announcement.going.filter((uid) => Authentication.user?.uid !== uid);
    }

    db.collection('announcements').doc(this.announcement._id).set(this.announcement);

    const userRef = db.collection('users').doc(Authentication.user.uid);
    userRef.get().then((doc) => {
      const user = doc.data();
      // eslint-disable-next-line
      let announcements = (user as any).announcements;
      if (user) {
        if (!condition) {
          announcements.unshift(this.announcement._id);
        } else {
          announcements = announcements.filter((uid: string) => this.announcement._id !== uid);
        }

        db.collection('users').doc(Authentication.user?.uid).update({
          announcements
        });
      } else {
        console.log("No such document!");
      }
    }).catch((err) => {
      console.log(err);
    });
    
  }

  async getAuthor() {
    const docRef = db.collection('users').doc(this.announcement.authorId);
    const doc = await docRef.get();
    
    if (doc.exists) {
      return ((doc.data() as User).username as string);
    } else {
      console.log('User was not found...');
    }

    return '';
  }

  removeTags(str: string) {
    if ((str === null) || (str === '')) {
      return '';
    } else {
      str = str.toString();
    }

    return str.replace( /(<([^>]+)>)/ig, ' ');
  }
  
  viewItem() {
    router.push(`/view/${this.announcement._id}`);
  }
}
</script>

<style lang="scss" scoped>
.announcement-item {
  margin-top: 15px;
  background: #fff;

  border: 2px solid #d4d4d4;
  border-radius: 10px;
  width: 95%;
  height: 180px;
  min-height: 180px;
  font-family: Rubik;

  cursor: pointer;

  position: relative;

  transition: background 0.1s ease;

  &:hover {
    background: #f5f5f5;
  }
}

.editor__content {
  outline: none;
  border: none;
  overflow-y: hidden;
  max-height: 25px;
}

.content {
  text-align: left;
  margin-left: 15px;

  #title {
    font-family: 'Rubik';
    font-weight: 300;
    margin-bottom: 5px;
  }

  #author, #body {
    font-family: 'Rubik Light';
    font-weight: 0;
  }

  #author {
    margin-bottom: 14px;
  }

  #body {
    padding-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.bottom-right {
  position: absolute;
  right: 0; 
  bottom: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  z-index: 25;

  .item {
    margin: 0 4px 4px;
  }
}

.bottom-left {
  position: absolute;
  left: 0; 
  bottom: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 12px 12px;
  
  div {
    margin-left: 4px;
  }
}
</style>