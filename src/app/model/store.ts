import {
  configureStore,
  combineReducers,
  PayloadAction,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import usersReducer from '@/entities/users/model/usersSlice';
import modalReducer from '@/entities/modal/model/modalSlice';
import transactionsReducer from '@/entities/transactions/model/transactionsSlice';

const appReducer = combineReducers({
  users: usersReducer,
  transactions: transactionsReducer,
  modal: modalReducer,
});
const rootReducer = (
  state: ReturnType<typeof appReducer>,
  action: PayloadAction<any>,
) => {
  if (action.type === 'store/reset') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer as typeof appReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
