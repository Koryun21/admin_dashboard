import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API } from '@/shared/config';

import { Transaction } from '../config';

export const fetchUserTransactions = createAsyncThunk(
  'users/fetchUserTransaction',
  async (userId: string) => {
    const response = await axios.get<Transaction[]>(
      `${API}/${userId}/transactions`,
    );

    return response.data;
  },
);
