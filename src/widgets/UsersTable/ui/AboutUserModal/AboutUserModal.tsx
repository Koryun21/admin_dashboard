import React, { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Modal, Table } from '@/shared/ui';

import { usersModel } from '@/entities/users';
import { ModalID, modalModel } from '@/entities/modal';
import { transactionsModel } from '@/entities/transactions';

import { useTransactionsTable } from '../../hooks/useTrnsactionsTable';

import styles from './AboutUserModal.module.scss';

export const AboutUserModal: FC = () => {
  const dispatch = useAppDispatch();

  const { modalData, isOpen } = useAppSelector(
    modalModel.selectors.selectModalById(ModalID.ABOUT_USER_MODAL),
  );

  const transactions = useAppSelector(
    transactionsModel.selectors.selectTransactions,
  );

  const currentUser = useAppSelector(
    usersModel.selectors.selectUserById(modalData.userId ?? ''),
  );

  const graphicData = transactions.map((item, index) => {
    const date = new Date(item.created_at);

    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);

    return {
      name: formattedDate,
      uv: index,
      pv: item.amount,
    };
  });

  const onCLose = () => {
    dispatch(modalModel.actions.closeModal(ModalID.ABOUT_USER_MODAL));
    dispatch(transactionsModel.actions.clearTransactions());
  };

  const { headerItems, bodyItems } = useTransactionsTable();

  return (
    <Modal
      className={styles.container}
      title={<h6>{currentUser?.email}</h6>}
      isOpen={isOpen}
      onClose={onCLose}
      contentClassName={cn(styles.modalContent, {
        [styles.openedModal]: isOpen,
      })}
      bodyClassName={styles.modalBody}
    >
      <h6>Использование токенов</h6>

      <ResponsiveContainer width="100%" height="100%" maxHeight={290}>
        <AreaChart height={290} data={graphicData}>
          <Area
            type="monotone"
            dataKey="pv"
            stroke="var(--primary)"
            fill={'var(--primary1)'}
            dot={<Dot style={{ display: 'none' }} />}
          />
          <CartesianGrid stroke="var(--gray3)" horizontal vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: 'transparent' }}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: 'var(--gray1)', fontSize: '14px' }}
            dx={-60}
          />
          <YAxis
            orientation="right"
            axisLine={{ stroke: 'transparent' }}
            tickLine={false}
            tick={{ fill: 'var(--gray1)', fontSize: '14px' }}
            tickMargin={14}
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer
        className={styles.smallGraph}
        width="100%"
        height="100%"
        maxHeight={24}
      >
        <LineChart height={24} data={Array(10).fill(graphicData).flat()}>
          <Line
            type="monotone"
            dataKey="pv"
            stroke="var(--gray1)"
            dot={<Dot style={{ display: 'none' }} />}
          />
          <CartesianGrid
            stroke="var(--gray3)"
            horizontal={false}
            vertical={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={styles.emailInfo}>
        <span className={styles.cube} />
        <p className={cn(styles.email, 'p6')}>{currentUser?.email}</p>
      </div>

      <h6>История операций</h6>

      <Table
        headerItems={headerItems}
        bodyItems={bodyItems}
        className={styles.table}
      />
    </Modal>
  );
};
