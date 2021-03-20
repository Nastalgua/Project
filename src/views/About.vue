<template>
  <div class="page">
    <h1>{{ firebaseData }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { db } from '../firebase';

const documentPath = 'users/matthew';

// make sure to change class name
@Component({
  firestore: {
    firebaseData: db.doc(documentPath)
  }
})
export default class About extends Vue {
  firebaseData = null;
}
</script>

<style lang="scss" scoped>
</style>