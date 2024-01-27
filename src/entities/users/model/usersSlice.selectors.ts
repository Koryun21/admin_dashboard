import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/app/model/store';

export const selectUsers = (state: RootState) => state.users;

export const selectUserById = (id: string) =>
  createSelector(
    (state: RootState) => state.users.data,
    (users) => {
      return users.find((user) => user.id === id);
    },
  );
