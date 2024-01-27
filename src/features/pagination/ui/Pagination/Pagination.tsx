import React, { FC } from 'react';
import cn from 'classnames';

import { Icon } from '@/shared/ui';

import { getPaginationItems } from '../../lib/getPaginationItems';

import styles from './Pagination.module.scss';

type PaginationProps = {
  pagesCount: number;
  currentPage: number;
  onChange: (pageNumber: number) => void;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const { pagesCount, currentPage, onChange } = props;

  const paginationItems = getPaginationItems(pagesCount, currentPage);

  if (pagesCount <= 1) {
    return null;
  }

  const handlePrevClick = () => {
    onChange(Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    onChange(Math.min(currentPage + 1, pagesCount));
  };

  return (
    <div className={styles.container}>
      <ul className={cn(styles.items, 'p4')}>
        <li className={styles.item} onClick={handlePrevClick}>
          <Icon width={19} height={18} name="arrowDown" />
        </li>
        {paginationItems.map((item, index) => {
          const isNumber = typeof item === 'number';

          return (
            <li
              key={item.toString + index.toString()}
              onClick={() => {
                if (isNumber) {
                  onChange(item);
                }
              }}
              className={cn(styles.item, {
                [styles.active]: item === currentPage,
                [styles.disabled]: !isNumber,
              })}
            >
              {item}
            </li>
          );
        })}
        <li className={styles.item} onClick={handleNextClick}>
          <Icon width={19} height={18} name="arrowDown" />
        </li>
      </ul>
    </div>
  );
};
