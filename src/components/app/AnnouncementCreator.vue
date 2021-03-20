<template>
  <div class="creator">
    <div class="items">
      <div class="title">
        <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
        <label for="name" class="form__label">What's the Announcement?</label>
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
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
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
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
          </button>

          <button
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
          </button>

          <button
            class="menubar__button"
            @click="commands.undo"
          >
          </button>

          <button
            class="menubar__button"
            @click="commands.redo"
          >
          </button>

        </div>
      </editor-menu-bar>
        <editor-content class="editor__content" :editor="editor" />
      </div>
      <div class="addons">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { categories } from "@/store/modules/announces";
import { Component, Vue } from "vue-property-decorator";
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
// make sure to change class name
@Component({
  components: {
    vSelect,
    EditorContent,
    EditorMenuBar
  }
})
export default class AnnouncementCreator extends Vue {
  selected = categories[0];
  data = null;

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

  get options() {
    return categories;
  }

  setSelected(value: string) {
    this.selected = value;
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

.editor__content {
  font-family: 'Rubik Light';
  padding: 8px;
  border: 1px solid #3c3c3c42;
  outline: none;
  margin: 0 auto;

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

.ProseMirror:focus {
  outline: none;
}
</style>

<style lang="scss" scoped>
$primary: #11998e;
$secondary: #38ef7d;
$black: #363636;
$gray: #9b9b9b;

$side-margin: 5%;

.desc {
  margin-left: $side-margin;
  margin-top: 25px;
  width: 90%;
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