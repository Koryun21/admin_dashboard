import React from 'react';

import { Logo } from './Logo/Logo';
import { Breadcrumb } from './Breadcrumb/Breadcrumb';
import { AuthStatus } from './AuthStatus/AuthStatus';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <Breadcrumb />
      <AuthStatus />
    </div>
  );
};
