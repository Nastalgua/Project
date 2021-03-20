<template>
  <div id="navbar" v-show="this.show">
    <div class="logo noselect" @click="goToHome()">{ Logo }</div>
    <div class="nav-links noselect">
      <router-link to="/about" class="link">About</router-link>
      <Dropdown :name="'Gym'" :items="gymDropdown" :useIcon="false" />
      <Dropdown :name="'Auth'" :useIcon="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "../../router";
import Dropdown from "../helpers/Dropdown.vue";
export interface Link {
  name: string;
  to: string;
  requireGuest?: boolean;
  requireAuth?: boolean;
}
// make sure to change class name
@Component({
  components: {
    Dropdown,
  },
})
export default class Navbar extends Vue {
  gymDropdown: Link[] = [
    {
      name: "Problem Sets",
      to: "/problems",
    },
    {
      name: "Topics",
      to: "/topics",
    },
    {
      name: "Videos",
      to: "/videos",
    },
  ];
  get show() {
    return this.$route.fullPath !== "/problem";
  }
  goToHome() {
    if (this.$route.fullPath !== "/") return router.push("/");
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";
#navbar {
  background: #25ac68;
  position: fixed;
  top: 0;
  height: $navbar-height;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  z-index: 999; // always on top
  .link,
  .logo {
    font-weight: normal;
    font-size: 18px;
    color: #ffffff;
    text-decoration: none;
    margin: 0 1em 0 1em;
    cursor: pointer;
  }
}
.nav-links {
  display: flex;
}
</style> 