import React from 'react';

import { Icon } from '@/shared/ui';

import styles from './Breadcrumb.module.scss';

export const Breadcrumb = () => {
  return (
    <div className={styles.container}>
      <Icon name="organization" className={styles.icon} />

      <p className="p3">Моя организация</p>
    </div>
  );
};
