<template>
  <div id="container">
    <div>
      <header>
        <p>Entradas</p>
        <img src="../assets/incoming.svg" alt="Entradas" />
      </header>
      <strong>
        {{ new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits) }}
        </strong>
    </div>
    <div>
      <header>
        <p>Saídas</p>
        <img src="../assets/outgoing.svg" alt="Saídas" />
      </header>
      <strong>
        - {{ new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws) }}
      </strong>
    </div>
    <div class="highlight-background">
      <header>
        <p>Total</p>
        <img src="../assets/total.svg" alt="Total" />
      </header>
      <strong>
        {{ new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total) }}
      </strong>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as transactionsStore from '../store/modules/transactions';

export default Vue.extend({
  computed: {
    summary() {
      const { transactions } = transactionsStore.getters;
      return transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
          acc.deposits += transaction.amount;
          acc.total += transaction.amount;
        } else {
          acc.withdraws += transaction.amount;
          acc.total -= transaction.amount;
        }

        return acc;
      }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
div#container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items:center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      line-height: 3rem;
      font-weight: 500;
    }

    &.highlight-background{
      background: var(--green);
      color: #FFF;
    }
  }
}
</style>
