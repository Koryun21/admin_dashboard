import React, { FC, useState } from 'react';

import { Button, Input, Modal } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import { User, usersModel } from '@/entities/users';
import { ModalID, modalModel } from '@/entities/modal';

import styles from './EditUserModal.module.scss';

export const EditUserModal: FC = () => {
  const dispatch = useAppDispatch();

  const { modalData, isOpen } = useAppSelector(
    modalModel.selectors.selectModalById(ModalID.USER_EDIT_MODAL),
  );

  const currentUser = useAppSelector(
    usersModel.selectors.selectUserById(modalData.userId),
  );

  const [newData, setNewData] = useState<Pick<User, 'name' | 'role'>>({
    name: '',
    role: '',
  });

  const handleChange = (key: keyof User, value: string) => {
    setNewData((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const onClose = () => {
    dispatch(modalModel.actions.closeModal(ModalID.USER_EDIT_MODAL));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (currentUser) {
      dispatch(
        usersModel.actions.editUser({
          id: modalData.userId,
          data: {
            name: newData.name || currentUser.name,
            role: newData.role || currentUser.role,
          },
        }),
      );
    }

    onClose();
  };

  return (
    <Modal
      title={<h6>Edit user</h6>}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
      onClose={onClose}
      isOpen={isOpen}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          onChange={(newValue) => handleChange('name', newValue)}
          value={newData.name}
          label="Name"
          placeholder={currentUser?.name}
        />
        <Input
          onChange={(newValue) => handleChange('role', newValue)}
          value={newData.role}
          label="Role"
          placeholder={currentUser?.role}
        />

        <div className={styles.buttons}>
          <Button onClick={onClose} size="small" variant="secondary">
            Cancel
          </Button>
          <Button size="small">Save</Button>
        </div>
      </form>
    </Modal>
  );
};
