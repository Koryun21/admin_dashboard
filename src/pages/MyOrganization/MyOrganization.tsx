import React from 'react';

import { Header } from '@/widgets/Header/ui/Header';
import { UsersTable } from '@/widgets/UsersTable';

import styles from './MyOrganization.module.scss';

export const MyOrganization = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <UsersTable />
    </div>
  );
};
