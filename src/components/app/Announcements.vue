<template>
  <div class="announcements">
    <AnnouncementItem 
      v-for="announcement in announces" 
      :key="announcement._id" 
      :announcement="announcement" 
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnnouncementItem from '@/components/app/AnnouncementItem.vue';
import store from "@/store";
import { Announces } from "@/store";
import { Announcement } from "@/store/modules/announces";

@Component({
  components: {
    AnnouncementItem
  },
  watch: {

  }
})
export default class Announcements extends Vue {
  mounted() {
    if (!Announces.fetchedAnnouncements) {
      store.dispatch('bindAnnouncementsRef');
      Announces.TRUE_FETCHED_ANNOUNCEMENTS();
    }
  }

  get filters() {
    return Announces.currFilters;
  }

  get announces() {
    let annnouncements: Announcement[] = store.state.announcements;
    this.filters.forEach(filter => {
      annnouncements = annnouncements.filter(announcement => filter === announcement.category);
    });
    
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    annnouncements = annnouncements.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));

    return annnouncements;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";

.announcements {
  height: calc(100% - #{$category-height});
  min-width: $sect-min-width;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>