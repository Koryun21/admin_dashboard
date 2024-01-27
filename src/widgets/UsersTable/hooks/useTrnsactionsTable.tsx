import React, { ReactElement } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';

import { useAppSelector } from '@/shared/hooks';

import {
  Transaction,
  transactionsModel,
  TransactionType,
} from '@/entities/transactions';

import styles from '../ui/UsersTable.module.scss';

const headerTitles: Record<string, string> = {
  type: 'Тип',
  amount: 'Сумма',
  created_at: 'Дата',
};

const transactionTypes: Record<keyof typeof TransactionType, string> = {
  [TransactionType.REPLENISH]: 'Пополнение',
  [TransactionType.WRITE_OFF]: 'Списание',
};

export const useTransactionsTable = (): {
  bodyItems: { id: string; elements: ReactElement[] }[];
  headerItems: ReactElement[];
} => {
  const transactions = useAppSelector(
    transactionsModel.selectors.selectTransactions,
  );

  const headerItems = Object.values(headerTitles).map((title) => (
    <p key={title} className={cn(styles.title, 'p6')}>
      {title}
    </p>
  ));

  const bodyItems = transactions.map((transaction) => ({
    id: transaction.id,
    elements: Object.keys(headerTitles).map((titleKey) => {
      const transactionItem = transaction[titleKey as keyof Transaction];

      if (headerTitles[titleKey] === headerTitles.type) {
        return (
          <p
            key={titleKey + transaction.id}
            className={cn(styles.bodyItem, 'p6')}
          >
            {transactionTypes[transactionItem as keyof typeof TransactionType]}
          </p>
        );
      }

      if (headerTitles[titleKey] === headerTitles.created_at) {
        return (
          <p
            key={titleKey + transaction.id}
            className={cn(styles.bodyItem, 'p6')}
          >
            {format(new Date(transactionItem), 'dd.MM.yy, HH:mm:ss').replace(
              ',',
              ', \n',
            )}
          </p>
        );
      }

      return (
        <p
          className={cn(styles.bodyItem, 'p6', {
            [styles[
              transaction.type === TransactionType.REPLENISH
                ? 'replenish'
                : 'writeOff'
            ]]: headerTitles[titleKey] === headerTitles.amount,
          })}
        >
          {transactionItem}
        </p>
      );
    }),
  }));

  return { headerItems, bodyItems };
};
