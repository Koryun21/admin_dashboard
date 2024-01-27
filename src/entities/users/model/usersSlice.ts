import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../config';

import { fetchUsers } from './usersSlice.thunks';

type UsersInitialState = {
  isLoading: boolean;
  data: User[];
  pages: number;
  nextPageUsers: User[];
};

const initialState: UsersInitialState = {
  isLoading: false,
  data: [],
  pages: 0,
  nextPageUsers: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<string>) => {
      state.data = [
        ...state.data.filter((user) => user.id !== action.payload),
        state.nextPageUsers[0],
      ];

      state.nextPageUsers = state.nextPageUsers.filter((_, index) => !!index);
    },
    editUser: (
      state,
      action: PayloadAction<{ id: string; data: Pick<User, 'name' | 'role'> }>,
    ) => {
      const userId = action.payload.id;
      const userData = action.payload.data;

      state.data.forEach((user, index) => {
        if (user.id === userId) {
          const editedUser = {
            ...user,
            ...userData,
          };

          state.data.splice(index, 1, editedUser);
        }
      });
    },
    sortAscending: (state) => {
      state.data = state.data.sort((a, b) => a.tokens - b.tokens);
    },
    sortDescending: (state) => {
      state.data = state.data.sort((a, b) => b.tokens - a.tokens);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (
        state,
        action: PayloadAction<{
          users: User[];
          pages: number;
          nextPageUsers: User[];
        }>,
      ) => {
        state.isLoading = false;
        state.data = action.payload.users;
        state.pages = action.payload.pages;
        state.nextPageUsers = action.payload.nextPageUsers;
      },
    );
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { actions } = usersSlice;

export default usersSlice.reducer;
