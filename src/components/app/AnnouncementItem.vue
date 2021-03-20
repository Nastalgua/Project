<template>
  <div class="announcement-item">
    <div class="content">
      <h2 id="title">{{ announcement.title }}</h2>
      <div id="author">By {{ announcement.author }}</div>
      <p id="body">{{ announcement.body }}</p>
    </div>
    <div class="bottom-right">
      <div>Going</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Announcement } from '@/store/modules/announces';

@Component({})
export default class AnnouncementItem extends Vue {
  @Prop() announcement!: Announcement;
}
</script>

<style lang="scss" scoped>
.announcement-item {
  margin-top: 15px;
  background: #f08080;
  width: 95%;
  height: 180px;
  font-family: Rubik;

  position: relative;
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
}
</style>