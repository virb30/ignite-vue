<template>
  <main>
    <Summary />
    <TransactionsTable />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Summary from './Summary.vue';
import TransactionsTable from './TransactionsTable.vue';

export default Vue.extend({
  components: { Summary, TransactionsTable },

});
</script>

<style lang="scss" scoped>
main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}
</style>
