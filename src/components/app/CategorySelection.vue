<template>
  <div class="category-selection"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class CategorySelection extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";
.category-selection {
  background: pink;
  width: 100%;
  min-width: $sect-min-width;
  height: $category-height;
}
</style>