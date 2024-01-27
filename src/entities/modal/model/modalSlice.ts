import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalID } from '@/entities/modal/config';

type ModalInitialState = {
  [key in ModalID]: {
    isOpen: boolean;
    modalData: { userId: string };
  };
};

const initialState: ModalInitialState = {
  [ModalID.USER_EDIT_MODAL]: {
    isOpen: false,
    modalData: {
      userId: '',
    },
  },
  [ModalID.ABOUT_USER_MODAL]: {
    isOpen: false,
    modalData: {
      userId: '',
    },
  },
};

const modalSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modalId: ModalID; data: { userId: string } }>,
    ) => {
      state[action.payload.modalId] = {
        isOpen: true,
        modalData: action.payload.data,
      };
    },
    closeModal: (state, action: PayloadAction<ModalID>) => {
      state[action.payload] = {
        isOpen: false,
        modalData: { userId: '' },
      };
    },
  },
});
export const { actions } = modalSlice;

export default modalSlice.reducer;
