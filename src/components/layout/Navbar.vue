<template>
  <div id="navbar">
    <div class="logo noselect" @click="goToHome()">Announce</div>
    <div class="nav-links noselect">
      <router-link to="/about" class="link">About</router-link>
      <router-link v-show="!isLoggedIn" to="/login" class="link">Login</router-link>
      <router-link v-show="!isLoggedIn" to="/register" class="link">Register</router-link>
      <div class="link" v-show="isLoggedIn" @click="logout()">Log out</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "../../router";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Authentication } from "@/store";
// make sure to change class name
@Component({})
export default class Navbar extends Vue {
  get isLoggedIn() {
    return !!Authentication.user;
  }
  goToHome() {
    if (this.$route.fullPath !== "/") return router.push("/");
  }
  logout() {
    try {
      firebase.auth().signOut();
      Authentication.SET_USER(null);
      if (router.currentRoute.path != '/') router.push('/');
    } catch (err) {
      console.log(err);
    }
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
  font-family: 'Rubik';
  
  .link, .logo {
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