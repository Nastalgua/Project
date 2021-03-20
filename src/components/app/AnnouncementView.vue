<template>
  <div class="view">
    <img v-if="announcement.imgLink !== ''" width="100%" height="100%" :src="announcement.imgLink" />
    <div class="content">
      <h2 id="title">{{ announcement.title }}</h2>
      <div id="author">By {{ author }}</div>
      <div id="time">
        <img class="item" width="20px" height="20px" src="@/assets/general/clock.svg" draggable="false" />
        <div class="item">Event begins on {{ date }}</div>
      </div>
      <div id="going">
        <img class="item go-icon" v-if="isGoing" width="50px" height="50px" src="@/assets/general/go.svg" draggable="false" @click="debounceGoing(true)" />
        <img class="item go-icon" v-if="!isGoing" width="50px" height="50px" src="@/assets/general/no-go.svg" draggable="false" @click="debounceGoing(false)" />
      </div>
      <editor-content class="editor__content" :editor="editor" />
      <div class="addon" v-if="announcement.website !== ''">
        <img width="24px" height="24px" src="@/assets/general/globe.svg" draggable="false" noselect />
        <a class="info" :href="announcement.website">{{ announcement.website }}</a>
      </div>
      <div class="addon" v-if="announcement.phoneNumber !== ''">
        <img width="24px" height="24px" src="@/assets/general/phone-numbers-call.svg" draggable="false" noselect />
        <div class="info">{{ announcement.phoneNumber }}</div>
      </div>
      <div class="addon" v-if="announcement.venue !== ''">
        <img width="24px" height="24px" src="@/assets/general/pin.svg" draggable="false" noselect />
        <div class="info">{{ announcement.venue }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { db } from "@/firebase";
import store, { Announces, Authentication, Map } from "@/store";
import { Announcement } from "@/store/modules/announces";

import { Editor, EditorContent } from 'tiptap';
import {
  Blockquote,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

import { debounce } from "debounce";

type User = {
  username: string;
}

@Component({
  components: {
    EditorContent
  },
  methods: {
    debounceGoing: debounce(function(this: any, condition: boolean) {
      this.changeToGoing(condition);
    }, 800)
  }
})
export default class AnnouncementView extends Vue {
  announcement: Announcement = {
    _id: '',
    title: '',
    authorId: '',
    body: '',
    location: {
      location: {
        lat: 0,
        lng: 0
      },
      radius: 0
    },
    imgLink: '',
    date: '',
    going: [],
    category: ''
  };

  author = '';

  get isGoing() {
    if (!Authentication.user) return false;
    return this.announcement.going.includes((Authentication.user.uid as string));
  }

  editor = new Editor({
    extensions: [
      new Blockquote(),
      new BulletList(),
      new HardBreak(),
      new Heading({ levels: [1, 2, 3] }),
      new HorizontalRule(),
      new ListItem(),
      new OrderedList(),
      new TodoItem(),
      new TodoList(),
      new Link(),
      new Bold(),
      new Code(),
      new Italic(),
      new Strike(),
      new Underline(),
      new History(),
    ],
    content: '',
    editable: false
  });
  
  get date() {
    return new Date(this.announcement.date).toLocaleDateString("en-US");
  }

  async mounted() {
    if (!Announces.fetchedAnnouncements) {
      const docRef = db.collection('announcements').doc(this.$router.currentRoute.params.id);
      const doc = await docRef.get();
      try {
        if (doc.exists) {
          this.announcement = (doc.data() as Announcement);
        } else {
          console.log('Failure to find...');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      store.state.announcements.forEach((announcement: Announcement) => {
        if (announcement._id === this.$router.currentRoute.params.id) {
          this.announcement = announcement;
        }
      });
    }

    this.author = await this.getAuthor();

    this.editor.setContent(this.announcement.body);

    Map.SET_CENTER({ center: this.announcement.location.location, useCircle: true });
    Map.SET_CENTER({ center: this.announcement.location.location, useCircle: false });

    Map.SET_OWN_LOCATION({ draggable: false, editable: false });

    Map.SET_RADIUS(this.announcement.location.radius);
  }

  changeToGoing(condition: boolean) {
    if (!Authentication.user?.uid) return;
    const docRef = db.collection('announcements').doc(this.announcement._id);

    if (!condition) {
      this.announcement.going.unshift(Authentication.user.uid);
    } else {
      this.announcement.going = this.announcement.going.filter((uid) => Authentication.user?.uid !== uid);
    }

    return docRef.update({
      going: this.announcement.going
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
}
</script>

<style lang="scss" scoped>
$side-margin: 5%;

.view {
  font-family: Rubik;
}

.content {
  margin-left: $side-margin;
  padding-bottom: 120px;
}

#title {
  font-family: 'Rubik SemiBold';
}

#author {
  font-family: 'Rubik Italic';
}

#time, #going {
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 10px;

  font-family: 'Rubik Light';

  img {
    margin-right: 6px;
  }
}

#going {
  margin: 20px 0;
  cursor: pointer;
}

.editor__content {
  width: 90%;
  font-family: 'Rubik Light';
  padding: 0 0 8px 0;
  outline: none;
  margin: 5px 0;

  p {
    margin: 0;
  }

  em {
    font-family: 'Rubik Italic';
  }

  h1, h2, h3 {
    font-family: 'Rubik SemiBold';
  }
}

.addon {
  margin: 8px 0;

  color: #25ac68;

  display: flex;
  flex-direction: row;
  align-items: center;

  .info {
    margin-left: 4px;
  }

  a {
    text-decoration: underline;

    &:visited {
      color: #25ac68;
    }
  }
}
</style>