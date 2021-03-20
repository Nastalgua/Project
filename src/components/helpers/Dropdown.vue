<template>
  <div class="dropdown">
    <p class="text" @click="open = !open">{{ name }}</p>
    <div class="items" v-if="open" v-click-outside="onClickOutside">
      <div
        class="item text"
        v-for="item in items"
        :key="item.name"
        v-show="item.show"
        @click="run(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Link } from "@/store";

@Component({})
export default class Dropdown extends Vue {
  @Prop() name!: boolean;
  @Prop() items!: Array<Link>;

  open = false;

  onClickOutside() {
    this.open = false;
  }

  run(link: Link) {
    this.open = false;
    
    if (link.callback) {
      link.callback();
      return;
    }

    this.$router.push((link.to as string)).catch(() => false);
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.items {
  position: absolute;
  top: 35px;
  margin: 0;
  padding: 0;
}

.text {
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
  margin: 0 1em 0 1em;
  cursor: pointer;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 165px;
  background: #29bb72;
  height: 40px;
  &:nth-child(odd) {
    background: #1f945a;
  }
}
</style>