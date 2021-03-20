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
  async created() {
    if (!Announces.fetchedAnnouncements) {
      await store.dispatch('bindAnnouncementsRef');
      Announces.TRUE_FETCHED_ANNOUNCEMENTS();
    }
  }

  get filters() {
    return Announces.currFilters;
  }

  get announces() {
    const annnouncements: Announcement[] = store.state.announcements;
    let newAnnouncements: Announcement[] = [];

    if (this.filters.length == 0) return annnouncements;

    this.filters.forEach(filter => {
      newAnnouncements = newAnnouncements.concat(annnouncements.filter(announcement => filter === announcement.category));
    });


    return newAnnouncements;
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