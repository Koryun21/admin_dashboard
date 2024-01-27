import React, { FC } from 'react';
import cn from 'classnames';

import { Icon } from '@/shared/ui';

import styles from './AuthStatus.module.scss';

export const AuthStatus: FC = () => {
  return (
    <div className={styles.container}>
      <Icon name="avatar" size={32} className={styles.icon} />

      <div className={styles.authInfo}>
        <p className={cn(styles.authStatus, 'p7')}>Вы авторизованы</p>
        <p className="p6">Администратор</p>
      </div>
    </div>
  );
};
