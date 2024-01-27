import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API, NUMBER_REGEX } from '@/shared/config';

import { UserData, User } from '../config';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    params: string,
  ): Promise<{ users: User[]; pages: number; nextPageUsers: User[] }> => {
    const nextPageParams = params.replace(NUMBER_REGEX, (matched) =>
      String(Number(matched) + 1),
    );

    const { data } = await axios.get<{ data: UserData[]; pages: number }>(
      `${API}/list${params}`,
    );

    const response = await axios.get<{ data: UserData[]; pages: number }>(
      `${API}/list${nextPageParams}`,
    );

    const nextPageUsers: User[] = response.data.data.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tokens: user.subscription.tokens,
      planType: user.subscription.plan.type,
      actions: ['edit', 'trash'],
    }));

    const users: User[] = data.data.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tokens: user.subscription.tokens,
      planType: user.subscription.plan.type,
      actions: ['edit', 'trash'],
    }));

    return { users, pages: data.pages, nextPageUsers };
  },
);
