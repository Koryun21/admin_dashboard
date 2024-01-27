import React, { FC } from 'react';
import cn from 'classnames';

import styles from './Spinner.module.scss';

type SpinnerProps = {
  className?: string;
  size?: number;
};

export const Spinner: FC<SpinnerProps> = (props) => {
  const { className, size = 48 } = props;

  return (
    <span
      className={cn(styles.spinner, className)}
      style={{ width: size, height: size }}
    />
  );
};
