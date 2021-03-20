<template>
  <div class="chat">
    <div class="messages" ref="msgs">
      <Message v-for="msg in messages" :key="msg._id" :msg="msg" />
    </div>
    <textarea 
      autocomplete="off" 
      type="text" 
      placeholder="Write a message..." 
      class="message-input" 
      v-model="inputMsg" 
      @keydown="handleInput($event)" 
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Message from '@/components/app/Message.vue';
import store, { Announces, Authentication } from "@/store";
import { db } from "@/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { DocumentReference } from '@firebase/firestore-types';
import { Announcement, Msg } from "@/store/modules/announces";
import { nanoid } from "nanoid";

type User = {
  username: string;
}

@Component({
  components: {
    Message
  }
})
export default class Chat extends Vue {
  announcement: Announcement | null = null;

  // messages: Msg[] = [
  //   /*
  //   { _id: '0', author: 'matthew_chen', _userId: 'sdasda', text: 'Osdasdasdassdasdaw aeaw eawe awsd acdasdas sdawe we asK' }, 
  //   { _id: '1', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'ni awe awe wa w ewr ceasddasdasdaasdasdasdasda job' }, 
  //   { _id: '2', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '3', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '4', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '5', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '6', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '7', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '8', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' },
  //   { _id: '9', author: 'matthew_chen', _userId: (Authentication.user?.uid as string), text: 'This is a app that does a good jobssssssssssssssssssssssssssssssssssssssssssssss' }
  //   */
  // ];

  inputMsg = '';
  ref: DocumentReference | null = null;
  announcementIndex = -1;

  async created() {
    if (!Announces.fetchedAnnouncements) {
      await store.dispatch('bindAnnouncementsRef');
      Announces.TRUE_FETCHED_ANNOUNCEMENTS();
    }

    const _id = this.$router.currentRoute.params.id;

    this.announcements.forEach((announcement: Announcement, index: number) => {
      if (announcement._id === _id) {
        this.announcement = announcement;
        this.ref = db.collection('announcements').doc(announcement._id);
        this.announcementIndex = index;
      }
    });
  }

  mounted() {
    const msgs = this.$refs.msgs;
    (msgs as HTMLElement).scrollTop = (msgs as HTMLElement).scrollHeight;

    setTimeout(() => {
      const scrollHeight = (this.$refs.msgs as HTMLElement).scrollHeight;
      (this.$refs.msgs as HTMLElement).scrollTo(0, scrollHeight);
    }, 500);
  }

  get announcements() {
    return store.state.announcements;
  }

  get messages() {
    if (this.announcementIndex == -1) return [];
    return this.announcements[this.announcementIndex].messages;
  }

  async handleInput(e: any) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await this.sendMessage();
      this.inputMsg = '';

      const msgs = this.$refs.msgs;
      (msgs as HTMLElement).scrollTop = (msgs as HTMLElement).scrollHeight;

      setTimeout(() => {
        (msgs as HTMLElement).scrollTop = (msgs as HTMLElement).scrollHeight;
      }, 100);
    }
  }

  async sendMessage() {
    const author = await this.getUsername();
    const msg: Msg = {
      text: this.inputMsg,
      author,
      _id: nanoid(),
      _userId: (Authentication.user?.uid as string)
    }

    this.ref?.update({
      messages: firebase.firestore.FieldValue.arrayUnion(msg)
    });
  }

  async getUsername() {
    const docRef = db.collection('users').doc(Authentication.user?.uid);
    const doc = await docRef.get();
    
    if (doc.exists) {
      return ((doc.data() as User).username as string);
    } else {
      console.log('User was not found...');
    }

    return '';
  }
}
</script>

<style lang="scss" scoped>
$padding: 12px;

.chat {
  position: relative;
  width: calc(100% - #{$padding});  
  height: calc(100% - #{$padding});
  background: #ffffff;

  display: flex;
  flex-direction: column;
}

.messages {
  padding: $padding 0 0 $padding;
  width: 100%;
  height: 100%;

  overflow-y: auto;
}

.message-input {
  font-family: Rubik;
  font-size: 16px;
  height: 10%;
  outline: none;
  border: none;
  padding: 6px 8px;
  background: #eeeeee;
  margin: 20px 0 0 calc(#{$padding} - 6px);
  resize: none;

  transition: border 0.2s ease-out;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>