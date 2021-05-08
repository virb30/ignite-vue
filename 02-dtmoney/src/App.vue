<template>
  <div>
    <Header />
    <Dashboard />
    <NewTransactionModal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/Header.vue';
import Dashboard from './components/Dashboard.vue';
import NewTransactionModal from './components/NewTransactionModal.vue';
import * as transactionsStore from './store/modules/transactions';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Dashboard,
    NewTransactionModal,
  },
  async mounted() {
    await transactionsStore.actions.loadTransactions();
  },
});
</script>
