<template>
  <app-container>
    <app-personal-data-sheet/>
  </app-container>
</template>

<script>
  import Container from "../components/shared/Container";
  import PersonalDataSheet from "../components/PersonalDataSheet";
export default {
  components: {
    'app-container': Container,
    'app-personal-data-sheet': PersonalDataSheet
  },
  async fetch({ store, route, error }) {
    await store.dispatch('personal-data/getData');
  },
}
</script>

<style>

</style>
