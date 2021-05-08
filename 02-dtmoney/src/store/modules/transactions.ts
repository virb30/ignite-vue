import { BareActionContext } from 'vuex-typex';
import { storeBuilder, RootState } from '../RootState';
import { api } from '../../services/api';

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  title: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' |'createdAt'>

export class TransactionsState {
  transactions: Transaction[] = []
}

const b = storeBuilder.module<TransactionsState>('transactions', new TransactionsState());

const getTransactions = b.read((state) => state.transactions, 'transactions');

export const getters = {
  get transactions(): Transaction[] {
    return getTransactions();
  },
};

function setTransactions(state: TransactionsState, transactions: Transaction[]): void {
  state.transactions = transactions;
}

export const mutations = {
  setTransactions: b.commit(setTransactions),
};

type ActionContext = BareActionContext<TransactionsState, RootState>

async function loadTransactions(context: ActionContext): Promise<void> {
  const response = await api.get<{ transactions: Transaction[]}>('transactions');
  const { transactions } = response.data;
  mutations.setTransactions(transactions);
}

async function createTransaction(context: ActionContext, transactionInput: TransactionInput) {
  const response = await api.post('/transactions', {
    ...transactionInput,
    createdAt: new Date(),
  });
  const { transaction } = response.data;
  mutations.setTransactions([...getTransactions(), transaction]);
}

export const actions = {
  loadTransactions: b.dispatch(loadTransactions),
  createTransaction: b.dispatch(createTransaction),
};
