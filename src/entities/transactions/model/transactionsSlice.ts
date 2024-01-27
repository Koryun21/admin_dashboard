import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Transaction } from '../config';

import { fetchUserTransactions } from './transactionsSlice.thunks';

type TransactionsInitialState = {
  isLoading: boolean;
  data: Transaction[];
};

const initialState: TransactionsInitialState = {
  isLoading: false,
  data: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserTransactions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUserTransactions.fulfilled,
      (state, action: PayloadAction<Transaction[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(fetchUserTransactions.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { actions } = transactionsSlice;

export default transactionsSlice.reducer;
