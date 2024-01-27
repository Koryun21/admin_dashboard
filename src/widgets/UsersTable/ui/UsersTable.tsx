import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Spinner, Table } from '@/shared/ui';

import { usersModel } from '@/entities/users';
import { ModalID, modalModel } from '@/entities/modal';
import { transactionsModel } from '@/entities/transactions';

import { Pagination } from '@/features/pagination';

import { EditUserModal } from '../ui/EditUserModal/EditUserModal';
import { useUsersTable } from '../hooks/useUsersTable';

import { Search } from './Search/Search';
import { AboutUserModal } from './AboutUserModal/AboutUserModal';
import styles from './UsersTable.module.scss';

export const UsersTable = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isLoading, pages } = useAppSelector(usersModel.selectors.selectUsers);

  const { headerItems, bodyItems } = useUsersTable();

  const handleOpenAboutUserModal = (userId: string) => {
    dispatch(transactionsModel.thunks.fetchUserTransactions(userId));

    dispatch(
      modalModel.actions.openModal({
        modalId: ModalID.ABOUT_USER_MODAL,
        data: { userId },
      }),
    );
  };

  return (
    <div className={styles.container}>
      <h5 className={styles.header}>Моя организация</h5>

      <Search currentPage={currentPage} />

      {isLoading ? (
        <Spinner className={styles.spinner} />
      ) : (
        <>
          <div className={styles.tableContainer}>
            <Table
              headerItems={headerItems}
              bodyItems={bodyItems}
              onRowClick={handleOpenAboutUserModal}
            />
          </div>

          <Pagination
            pagesCount={pages}
            currentPage={currentPage}
            onChange={(pageNumber) => {
              setCurrentPage(pageNumber);
            }}
          />
        </>
      )}

      <AboutUserModal />

      <EditUserModal />
    </div>
  );
};
