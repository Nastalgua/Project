<template>
  <div class="message" :class="{ 'own' : this.own }">
    <div class="msg">
      <div id="author">{{ msg.author }}</div>
      <div id="body">{{ msg.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Authentication } from "@/store";
import { Msg } from "@/store/modules/announces";
import { Component, Prop, Vue } from "vue-property-decorator";

// make sure to change class name
@Component({})
export default class Message extends Vue {
  @Prop() msg!: Msg;

  get own() {
    return Authentication.user?.uid === this.msg._userId;
  }
}
</script>

<style lang="scss" scoped>
.message {
  height: auto;
  width: 98%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.msg {
  width: auto;
  max-width: 40%;
  margin: 0 0 8px 0;
  border-radius: 10px 10px 10px 0;
  border: 2px solid #d4d4d4;

  background: #fff;
  padding: 6px 10px;

  #body {
    width: inherit;
    word-wrap: break-word;
  }
}

#author {
  font-family: 'Rubik Italic';
  color: #25ac68;
}

.own {
  align-items: flex-end;

  .msg {
    border-radius: 10px 10px 0 10px;
  }
}
</style>