<template>
  <div class="page home">
    <div class="main" v-if="this.$route.fullPath === '/'">
      <CategorySelection />
      <Announcements />
    </div>
    <div class="main" v-if="this.$route.fullPath === '/create'">
      <AnnouncementCreator />
    </div>
    <div class="main" v-if="this.$route.fullPath.includes('/view')">
      <AnnouncementView />
    </div>
    <GmapMap
      ref="mapRef"
      :center="viewCenter"
      :zoom="12"
      style="width: 60%;  height: 100%"
    >
      <GmapCircle :center="circleCenter" :draggable="ownLocation.draggable" :editable="ownLocation.editable" :radius="circleRadius" @center_changed="centerChange" />
    </GmapMap>
    <GmapAutocomplete id="gSearch"
      v-if="!this.$route.fullPath.includes('/view')"
      @place_changed="setPlace"
      :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Announcements from '@/components/app/Announcements.vue';
import CategorySelection from '@/components/app/CategorySelection.vue';
import AnnouncementCreator from '@/components/app/AnnouncementCreator.vue';
import AnnouncementView from '@/components/app/AnnouncementView.vue';
import { Map } from "@/store";

@Component({
  components: {
    CategorySelection,
    Announcements,
    AnnouncementCreator,
    AnnouncementView
  }
})
export default class Home extends Vue {
  get viewCenter() {
    return Map.viewCenter;
  }

  get circleCenter() {
    return Map.circleCenter;
  }

  get circleRadius() {
    return Map.circleRadius;
  }

  get currentPlace() {
    return Map.currentPlace;
  }

  get ownLocation() {
    return Map.userOwnLocation;
  }

  mounted() {
    Map.GEOLOCATE(false);
  }

  setPlace(place: google.maps.Place) {
    Map.SET_CURRENT_PLACE(place);

    if (this.$route.fullPath === '/create') {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      Map.SET_CENTER({ 
        center: {
          lat: (place as any).geometry.location.lat(), 
          lng: (place as any).geometry.location.lng() 
        }, 
        useCircle: true
      });
    }
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  centerChange(value: any) {
    if (Map.searchedLocation) {
      Map.SET_SEARCHED_LOCATION(false);
      return;
    }

    Map.SET_CENTER({ center: { lat: value.lat(), lng: value.lng() }, useCircle: true });
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
  overflow-y: auto;
}

.map {
  background: lightgreen;
  width: calc(100% - #{$main-width});
  height: 100%;
}

#gSearch {
  position: absolute;
  right: 60px;
  top: 12px;
  width: 200px;
  height: 30px;
  outline: none;
}

@media screen and (max-width: 875px) {
  .home {
    flex-direction: column-reverse;
    width: 100vw;
  }

  .map {
    width: 100%;
    height: 40vh;
  }

  .main {
    width: 100%;
  }
}
</style>