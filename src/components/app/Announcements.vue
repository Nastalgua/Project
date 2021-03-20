<template>
  <div class="announcements">
    <AnnouncementItem 
      v-for="announcement in announcements" 
      :key="announcement._id" 
      :announcement="announcement" 
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnnouncementItem from '@/components/app/AnnouncementItem.vue';
import { Announces } from "@/store";

@Component({
  components: {
    AnnouncementItem
  }
})
export default class Announcements extends Vue {
  get announcements() {
    return Announces.announcements;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";

.announcements {
  background: plum;
  height: calc(100% - #{$category-height});
  min-width: $sect-min-width;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>