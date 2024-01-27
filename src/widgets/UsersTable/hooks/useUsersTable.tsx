import React, { ReactElement, useState } from 'react';
import cn from 'classnames';

import { Icon } from '@/shared/ui';
import { IconName } from '@/shared/ui/Icon/Icons.types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import { User, usersModel } from '@/entities/users';
import { ModalID, modalModel } from '@/entities/modal';

import styles from '../ui/UsersTable.module.scss';

const headerTitles: Record<string, string> = {
  email: 'Email',
  name: 'Имя',
  role: 'Роль',
  planType: 'Подписка',
  tokens: 'Токены',
  actions: 'Действия',
};

export const useUsersTable = (): {
  headerItems: ReactElement[];
  bodyItems: { id: string; elements: ReactElement[] }[];
} => {
  const dispatch = useAppDispatch();

  const [sortDescending, setSortDescending] = useState<boolean>(false);

  const { data } = useAppSelector(usersModel.selectors.selectUsers);

  const handleSort = () => {
    if (sortDescending) {
      dispatch(usersModel.actions.sortDescending());
    } else {
      dispatch(usersModel.actions.sortAscending());
    }

    setSortDescending((prevState) => !prevState);
  };

  const handleDelete = (userId: string) => {
    dispatch(usersModel.actions.removeUser(userId));
  };

  const handleEdit = (userId: string) => {
    dispatch(
      modalModel.actions.openModal({
        modalId: ModalID.USER_EDIT_MODAL,
        data: { userId },
      }),
    );
  };

  const headerItems = Object.values(headerTitles).map((title) => {
    if (title === headerTitles.tokens) {
      return (
        <div key={title} className={styles.tokens}>
          <p className={cn(styles.headerItem, 'p6')}>{title}</p>
          <Icon
            onClick={handleSort}
            name="arrowDown"
            className={cn({ [styles.ascendingIcon]: !sortDescending })}
            size={18}
          />
        </div>
      );
    }
    return (
      <p key={title} className={cn(styles.headerItem, 'p6')}>
        {title}
      </p>
    );
  });

  const bodyItems = data.map((user) => ({
    id: user.id,
    elements: Object.keys(headerTitles).map((titleKey) => {
      const content = user[titleKey as keyof User];

      if (headerTitles.actions === headerTitles[titleKey]) {
        return (
          <div key={titleKey + user.id} className={styles.actions}>
            {(content as IconName[]).map((iconName) => (
              <Icon
                onClick={(event) => {
                  event.stopPropagation();
                  if (iconName === 'edit') {
                    handleEdit(user.id);
                  } else {
                    handleDelete(user.id);
                  }
                }}
                key={iconName}
                name={iconName}
                size={18}
              />
            ))}
          </div>
        );
      }
      return (
        <p key={titleKey + user.id} className={cn(styles.bodyItem, 'p6')}>
          {content}
        </p>
      );
    }),
  }));

  return { headerItems, bodyItems };
};
