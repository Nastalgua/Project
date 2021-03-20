<template>
  <div class="category noselect" :class="{ 'on' : this.on }" @click="changeCategory()">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { Announces } from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
// make sure to change class name
@Component({})
export default class CategoryItem extends Vue {
  @Prop() name!: string;

  on = false;

  changeCategory() {
    this.on = !this.on;

    if (this.on) {
      Announces.ADD_FILTER(this.name);
    } else {
      Announces.REMOVE_FILTER(this.name);
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  background: #fff;
  color: #000;
  border: 1px solid #444444;
  border-radius: 4px;
  margin: 0 4px;
  padding: 4px 7px;

  cursor: pointer;

  width: auto;
  height: 16px;

  &:hover {
    background: #2dc266;
    border: 1px solid #2dc266;
    color: #fff;
  }
}

.on {
  background: #2dc266;
  border: 1px solid #2dc266;
  color: #fff;
}
</style>