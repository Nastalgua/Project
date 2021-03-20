<template>
  <div class="chat-item" @click="viewChat()">
    <h2 id="title">{{ announcement.title }}</h2>
    <div id="extra">
      <div id="author">By {{ this.author }}</div>
      <div id="date">
        <img width="18px" height="18px" src="@/assets/general/clock.svg" />
        <div>{{ this.date }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from "@/firebase";
import router from "@/router";
import { Announcement } from "@/store/modules/announces";
import { Component, Prop, Vue } from "vue-property-decorator";

type User = {
  username: string;
}

@Component({})
export default class ChatItem extends Vue {
  @Prop() announcement!: Announcement;
  author = '';

  async mounted() {
    this.author = await this.getAuthor();
  }

  get date() {
    const date = this.announcement.date;

    return `${date.substring(0, 2)}/${date.substring(2, 4)}/${date.substring(4, 6)}`;
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

  viewChat() {
    router.push(`/chat/${this.announcement._id}`);
  }
}
</script>

<style lang="scss" scoped>
.chat-item {
  margin-top: 10px;
  background: #fff;
  position: relative;

  border: 2px solid #d4d4d4;
  border-radius: 8px;

  width: 95%;
  height: 60px;

  transition: background 0.1s ease;

  display: flex;
  align-items: center;

  font-family: Rubik;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
}

#title {
  margin-left: 20px;
  font-family: 'Rubik SemiBold';
}

#extra {
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  right: 0;
  margin-right: 12px;

  #date, #author {
    margin: 0 12px;
  }

  #author {
    font-family: 'Rubik Italic';
  }

  #date {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
    }
  }
}
</style>