import React, { FC, useEffect } from 'react';

import { Input } from '@/shared/ui';
import { useAppDispatch, useSearch } from '@/shared/hooks';

import { usersModel } from '@/entities/users';

import styles from './Search.module.scss';

type SearchProps = {
  currentPage: number;
};

export const Search: FC<SearchProps> = (props) => {
  const { currentPage } = props;

  const [value, onChange] = useSearch();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      usersModel.thunks.fetchUsers(
        value ? `?search=${value}` : `?page=${currentPage}`,
      ),
    );
  }, [value, dispatch, currentPage]);

  return (
    <div className={styles.container}>
      <h5>Пользователи</h5>

      <Input
        value={value}
        placeholder="Поиск"
        onChange={onChange}
        iconName="search"
      />
    </div>
  );
};
