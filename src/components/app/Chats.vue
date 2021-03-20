<template>
  <div class="chats">
    <ChatItem v-for="announcement in chats" :key="announcement._id" :announcement="announcement" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChatItem from '@/components/app/ChatItem.vue';
import store, { Announces, Authentication } from "@/store";
import { Announcement } from "@/store/modules/announces";

@Component({
  components: {
    ChatItem
  }
})
export default class Chats extends Vue {
  mounted() {
    if (!Announces.fetchedAnnouncements) {
      store.dispatch('bindAnnouncementsRef');
      Announces.TRUE_FETCHED_ANNOUNCEMENTS();
    }
  }

  get chats() {
    if (!Authentication.user) return [];
    let announcements: Announcement[] = store.state.announcements;

    announcements = announcements.filter((announcement: Announcement) => announcement.going.includes((Authentication.user?.uid as string)));

    return announcements;
  }
}
</script>

<style lang="scss" scoped>
.chats {
  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: 10px;
}
</style>