<template>
  <div class="sidebar">
    <img class="logo noselect" @click="goToHome()" src="@/assets/general/Logo.svg"/>
    <div class="nav-links noselect">
      <router-link to="/" class="link">Browse</router-link>
      <router-link v-show="isLoggedIn" to="/create" class="link">Create</router-link>
      <router-link v-show="isLoggedIn" to="/chats" class="link">Chats</router-link>
      <router-link v-show="!isLoggedIn" to="/login" class="link">Login</router-link>
      <router-link v-show="!isLoggedIn" to="/register" class="link">Register</router-link>
    </div>
    <div class="bottom">
      <div class="link logout" v-show="isLoggedIn" @click="logout()">Log out</div>
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

  updateCurrState(state: number) {
    this.$store.dispatch('updateCurrState', state);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";

.sidebar {
  background: #25ac68;
  position: fixed;
  top: 0;
  height: 100vh;
  width: $sidebar-width;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;

  font-family: 'Rubik';
}

.link, .logo {
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
  margin: 0 1em 0 0;
  cursor: pointer;
}

.logo {
  margin: 0 1em 0 1em;
}

.link {
  width: calc(100% - 24px);
  height: 30px;
  margin: 8px 0;

  display: flex;
  align-items: center;
  padding-left: 24px;

  &:hover {
    background: #1e8f57;
  }

  .router-link-exact-active {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      background: #fff;
      width: 10px;
      height: 30px;
    }
  }
}

.logo {
  font-size: 32px;
  margin-top: 10px;
}

.nav-links {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom {
  position: absolute;
  bottom: 0;
  padding-bottom: 40px;

  .link {
    width: 100%;
    background: none;
    margin: 0;
    padding-left: 0;
  }
}

@media screen and (max-width: 775px) {
  .sidebar {
    display: none;
  }
}
</style>