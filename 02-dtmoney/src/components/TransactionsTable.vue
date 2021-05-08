<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Data</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.title }}</td>
            <td :class="[transaction.type]">
              {{ new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount) }}
            </td>
            <td>{{ transaction.category }}</td>
            <td>
              {{ new Intl.DateTimeFormat('pt-BR')
                .format(new Date(transaction.createdAt)) }}
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as transactionsStore from '../store/modules/transactions';

export default Vue.extend({
  computed: {
    transactions() {
      return transactionsStore.getters.transactions;
    },
  },
});
</script>

<style lang="scss" scoped>
div {
   margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child{
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }
  }
}
</style>
