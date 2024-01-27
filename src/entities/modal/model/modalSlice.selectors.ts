import { ModalID } from '@/entities/modal';

import { RootState } from '@/app/model/store';

export const selectModalById = (modalId: ModalID) => (state: RootState) =>
  state.modal[modalId];
