<template>
  <div class="creator">
    <div class="items">
      <div class="title">
        <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="title" />
        <label for="name" class="form__label">What's the Project?</label>
      </div>
      <div class="sect">
        <div>Category</div>
        <vSelect id="category" :value="selected" :options="options" @input="setSelected" />
      </div>
      <div class="sect">
        <div>Date</div>
        <v-date-picker
          mode="single"
          v-model="data"
          popover-visibility='visible'
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="date-input"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
      <div class="desc">
        <div style="margin-bottom: 8px">Description</div>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/bold.svg" />
            </div>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/italic.svg" />
            </div>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/underline.svg" />
            </div>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/paragraph.svg" />
            </div>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/ul.svg" />
            </div>
          </button>

          <button
            class="menubar__button"
            @click="commands.undo"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/undo.svg" />
            </div>
          </button>

          <button
            class="menubar__button"
            @click="commands.redo"
          >
            <div class="icon">
              <img class="icon__svg" src="@/assets/editor/redo.svg" />
            </div>
          </button>

        </div>
        </editor-menu-bar>
        <editor-content class="editor__content" :editor="editor" />
      </div>
      <div class="addons">
        <button class="addon-btn" @click="changeState(0)" v-show="!addonsState.website">Add Website</button>
        <button class="addon-btn" @click="changeState(1)" v-show="!addonsState.phoneNumber">Add Phone</button>
        <button class="addon-btn" @click="changeState(2)" v-show="!addonsState.venue">Add venue</button>
      </div>
      <div class="addons-extra">
        <div class="in" v-show="addonsState.website">
          <input id="website" placeholder="Website..." v-model="website" />
          <img 
            style="margin-left: 10px" 
            width="20px" 
            height="20px" 
            src="@/assets/general/close.svg" 
            @click="changeStateBack(0)" />
        </div>
        <div class="in" v-show="addonsState.phoneNumber">
          <input id="phone" placeholder="Phone number..." v-model="phoneNumber" />
          <img 
            style="margin-left: 10px" 
            width="20px" 
            height="20px" 
            src="@/assets/general/close.svg" 
            @click="changeStateBack(1)" />
        </div>
        <div class="in" v-show="addonsState.venue">
          <input id="venue" placeholder="Venue..." v-model="venue" />
          <img 
            style="margin-left: 10px" 
            width="20px" 
            height="20px" 
            src="@/assets/general/close.svg" 
            @click="changeStateBack(2)" />
        </div>
        <div class="in" style="margin-top: 25px;">
          <input id="image-link" placeholder="Image link..." v-model="imageLink" />
        </div>
      </div>
      <div class="submit">
        <button class="submit-btn" :class="{ 'disabled': title === '' }" @click="submitAnnoucement()">Announce!</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { categories } from "@/store/modules/announces";
import vSelect from "vue-select";

import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
import { Announcement } from '@/store/modules/announces';
import store, { Authentication, Map } from "@/store";
import router from "@/router";
import { db } from '@/firebase';
import { nanoid } from 'nanoid';

@Component({
  components: {
    vSelect,
    EditorContent,
    EditorMenuBar,
  },
})
export default class AnnouncementCreator extends Vue {
  selected = categories[0];
  data = new Date();
  title = '';

  website = '';
  phoneNumber = '';
  venue = '';

  imageLink = '';

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
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a very <em>basic</em> example of tiptap.
      </p>
      <ul>
        <li>
          A regular list
        </li>
        <li>
          With regular items
        </li>
      </ul>
      <blockquote>
        It's amazing 👏
        <br />
        – mom
      </blockquote>
    `,
  });

  addonsState = {
    website: false,
    phoneNumber: false,
    venue: false
  };

  mounted() {
    Map.SET_OWN_LOCATION({ draggable: true, editable: true });
  }

  changeState(index: number) {
    if (index == 0) {
      this.addonsState.website = true;
    } else if (index == 1) {
      this.addonsState.phoneNumber = true;
    } else {
      this.addonsState.venue = true;
    }
  }

  changeStateBack(index: number) {
    if (index == 0) {
      this.addonsState.website = false;
    } else if (index == 1) {
      this.addonsState.phoneNumber = false;
    } else {
      this.addonsState.venue = false;
    }
  }

  get options() {
    return categories;
  }

  setSelected(value: string) {
    this.selected = value;
  }

  async submitAnnoucement() {
    if (this.title === '') return;
    
    const _id = nanoid();
    const authorId: string = (Authentication.user?.uid as string);
    
    const date = this.data.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/[^0-9]/g, "");

    const time = this.data.getTime().toString();

    const announcement: Announcement = {
      _id,
      title: this.title,
      authorId,
      body: this.editor.getHTML(),
      date: date + time,
      going: [
        (Authentication.user?.uid as string)
      ],
      category: this.selected,
      location: {
        location: Map.circleCenter,
        radius: Map.circleRadius
      },
      messages: [],
      imgLink: this.imageLink,
      website: this.website,
      phoneNumber: this.phoneNumber,
      venue: this.venue
    };
    
    Map.SET_OWN_LOCATION({ draggable: false, editable: false });

    await db.collection('announcements').doc(announcement._id).set(announcement);

    router.push('/');
  }

  destroyed() {
    Map.SET_OWN_LOCATION({ draggable: false, editable: false });
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

.v-select {
  margin-top: 8px;
  width: 35%;
  cursor: pointer;
} 

.ProseMirror {
  height: 100%;
  outline: none;
}

.ProseMirror:hover {
  outline: none;
}
</style>

<style lang="scss" scoped>
.editor__content {
  font-family: 'Rubik Light';
  padding: 8px;
  border: 1px solid #3c3c3c42;
  outline: none;
  margin: 0 auto;
  height: 175px;
  overflow-y: auto;

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
</style>

<style lang="scss" scoped>
@import '@/scss/_editor_icon.scss';

$primary: #11998e;
$secondary: #38ef7d;
$black: #363636;
$gray: #9b9b9b;

$side-margin: 5%;
$addon-btn-color: #2dc266;

.creator {
  font-family: Rubik;
}

.desc, .addons {
  margin-left: $side-margin;
  margin-top: 25px;
  width: 90%;
}

.addons {
  button {
    margin: 0 4px;
  }

  .addon-btn {
    border: 2px solid $addon-btn-color;
    border-radius: 4px;
    outline: none;
    padding: 4px 8px;
    background: #fff;
    color: $addon-btn-color;

    cursor: pointer;

    transition: background 0.2s ease;

    &:hover {
      background: $addon-btn-color;
      color: #fff;
    }
  }
}

.addons-extra {
  margin-left: $side-margin;
  width: 30%;
  display: flex;
  flex-direction: column;

  .in {
    margin: 8px 0;

    display: flex;
    flex-direction: row;
  }
}

.menubar__button {
  background: #fff;
  border: none;

  width: 24px;
  height: 24px;
  margin: 0 10px;
  padding: 3px;

  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
}

.submit {
  display: flex;
  justify-content: center;

  .submit-btn {
    margin-top: 40px;
    margin-bottom: 80px;

    outline: none;
    border: none;
    border-radius: 4px;
    background: #2dc266;
    color: #fff;
    padding: 5px 9px;
    font-size: 20px;

    cursor: pointer;

    transition: background 0.2s ease;

    &:hover {
      background: #25a054;
    }

    &.disabled {
      background: #d8d8d8;
    }
  }
}

.title {
  margin: 50px auto;
  width: 90%;
  position: relative;
}

.date-input {
  margin-top: 8px;
  width: 32.5%;
  font-size: 16px;
  padding: 4px 6px;
  border: 1px solid #3c3c3c42;
  border-radius: 4px;
  outline: none;
}

.sect {
  margin-top: 16px;
  margin-left: $side-margin;
  text-align: left;
}

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: $black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  text-align: center;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0px;
  left: 50%;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
  transform: translate(-50%, -50%);
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight:700;    
  }

  padding-bottom: 6px;  
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary,$secondary);
  border-image-slice: 1;
}

.form__field{
  &:required,&:invalid { box-shadow:none; }
}

body {
  font-family: 'Poppins', sans-serif; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color:#222222;
}

</style>