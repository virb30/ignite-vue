<template>
  <Modal name="newTransactionsModal" :classes="['modal-content']" height="auto">
    <button type="button" @click="handleCloseModal" class="modal-close">
      <img src="../assets/close.svg" alt="Fechar modal" />
    </button>
    <form @submit.prevent="handleCreateNewTransaction">
      <h2>Cadastrar Transação</h2>

      <input
        placeholder="Título"
        v-model="title"
      />
      <input
        type="number"
        placeholder="Valor"
        v-model="amount"
      />

      <div id="transactionTypeContainer">
        <button class="radioBox"
          type="button"
          @click="() => this.type = 'deposit'"
          :style="depositStyle"
        >
          <img src="../assets/incoming.svg" alt="Entrada" />
          <span>Entrada</span>
        </button>

        <button class="radioBox"
          type="button"
          @click="() => this.type = 'withdraw'"
          :style="withdrawStyle"
        >
          <img src="../assets/outgoing.svg" alt="Saída" />
          <span>Saída</span>
        </button>
      </div>

      <input
        placeholder="Categoria"
        v-model="category"
      />

      <button type="submit">
        Cadastrar
      </button>
    </form>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { transparentize } from 'polished';
import * as transactionsStore from '../store/modules/transactions';

const colors = {
  green: '#33CC95',
  red: '#E52E4D',
};

interface Data {
  type: 'deposit' | 'withdraw';
  title: string;
  amount: number;
  category: string;
}

interface Methods {
  handleCloseModal: () => void;
  handleCreateNewTransaction: () => void;
}

interface Styles {
  background: string;
}

interface Computed {
  depositStyle: Styles;
  withdrawStyle: Styles;

}

export default Vue.extend<Data, Methods, Computed>({
  data() {
    return {
      type: 'deposit',
      title: '',
      amount: 0,
      category: '',
    };
  },
  computed: {
    depositStyle() {
      return {
        background: `${this.type === 'deposit' ? transparentize(0.9, colors.green) : 'transparent'}`,
      };
    },
    withdrawStyle() {
      return {
        background: `${this.type === 'withdraw' ? transparentize(0.9, colors.red) : 'transparent'}`,
      };
    },
  },
  watch: {
    amount(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.amount = Number(newValue);
      }
    },
  },
  methods: {
    async handleCreateNewTransaction() {
      const {
        title, amount, category, type,
      } = this;

      await transactionsStore.actions.createTransaction({
        title,
        amount,
        category,
        type,
      });

      this.title = '';
      this.amount = 0;
      this.category = '';
      this.type = 'deposit';
      this.handleCloseModal();
    },
    handleCloseModal() {
      this.$modal.hide('newTransactionsModal');
    },
  },
});
</script>

<style lang="scss" scoped>
form {
    h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder{
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover{
      filter: brightness(0.9);
    }
  }
}

div#transactionTypeContainer{
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

button.radioBox {
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  display:flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: darken(#d7d7d7, 10%);
  }

  img{
    width: 20px;
    height: 20px;
  }

  span{
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
}
</style>
