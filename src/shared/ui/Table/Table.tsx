import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import styles from './Table.module.scss';

type TableProps = {
  className?: string;
  headerItems: ReactElement[];
  bodyItems: { id: string; elements: ReactElement[] }[];
  onRowClick?: (id: string) => void;
};

export const Table: FC<TableProps> = (props) => {
  const { className, headerItems, bodyItems, onRowClick } = props;

  const handleClick = (id: string) => {
    if (onRowClick) {
      onRowClick(id);
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headerItems.map((headerItem) => (
              <th key={headerItem.key} className={cn(styles.th, 'p6')}>
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bodyItems.map((bodyItem) => (
            <tr
              key={bodyItem.id}
              className={styles.tr}
              onClick={() => handleClick(bodyItem.id)}
            >
              {bodyItem.elements.map((rowItem) => (
                <td key={rowItem.key} className={cn(styles.td, 'p6')}>
                  {rowItem}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
