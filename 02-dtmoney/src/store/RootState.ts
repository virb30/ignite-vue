import { getStoreBuilder } from 'vuex-typex';
import { TransactionsState } from './modules/transactions';

export interface RootState {
  transactions: TransactionsState
}

export const storeBuilder = getStoreBuilder<RootState>();
