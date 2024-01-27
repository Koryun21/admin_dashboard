import { RootState } from '@/app/model/store';

export const selectTransactions = (state: RootState) => state.transactions.data;
