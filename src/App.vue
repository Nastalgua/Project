<template>
  <div id="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "./components/layout/Sidebar.vue";
@Component({
  components: {
    Sidebar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/scss/_global.scss";

@font-face {
  font-family: 'Rubik';
  src: url('./assets/fonts/rubik/Rubik-Medium.ttf');
}

@font-face {
  font-family: 'Rubik Light';
  src: url('./assets/fonts/rubik/Rubik-Light.ttf');
}

@font-face {
  font-family: 'Rubik Semibold';
  src: url('./assets/fonts/rubik/Rubik-SemiBold.ttf');
}

@font-face {
  font-family: 'Rubik Italic';
  src: url('./assets/fonts/rubik/Rubik-Italic.ttf');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  outline: none;
  display: flex;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
}

.page {
  padding-left: $sidebar-width;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media screen and (max-width: 875px) {
  .page {
    padding-left: 0;
  }
}
</style>