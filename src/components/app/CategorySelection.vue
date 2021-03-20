<template>
  <div class="category-selection">
    <CategoryItem v-for="category in categories" :name="category" :key="category.name" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CategoryItem from '@/components/app/CategoryItem.vue';
import { categories } from '@/store/modules/announces';

@Component({
  components: {
    CategoryItem
  }
})
export default class CategorySelection extends Vue {
  categories: string[] = [];

  mounted() {
    this.categories = categories;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_global.scss";

$padding: 4px;

.category-selection {
  width: calc(100% - #{2 * $padding});
  min-width: $sect-min-width;
  height: $category-height;
  padding: 0 $padding;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
}
</style>