<template>
  <div class="page home">
    <div class="main" v-show="showBrowse">
      <CategorySelection />
      <Announcements />
    </div>
    <div class="main" v-show="showCreator">
      <AnnouncementCreator />
    </div>
    <div class="map">
    </div>
      <!-- <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Announcements from '@/components/app/Announcements.vue';
import CategorySelection from '@/components/app/CategorySelection.vue';
import AnnouncementCreator from '@/components/app/AnnouncementCreator.vue';

import store, { STATES } from '@/store';

@Component({
  components: {
    CategorySelection,
    Announcements,
    AnnouncementCreator
  }
})
export default class Home extends Vue {
  get showBrowse() {
    return store.state.currState == STATES.BROWSE;
  }

  get showCreator() {
    return store.state.currState == STATES.CREATE;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";

$main-width: 55%;

.home {
  display: flex;
  flex-direction: row;
  width: calc(100vw - #{$sidebar-width});
}

.main {
  width: $main-width;
  height: 100vh;
}

.map {
  background: lightgreen;
  width: calc(100% - #{$main-width});
  height: 100%;
}
</style>