import React, { FC, PropsWithChildren, ReactNode } from 'react';
import cn from 'classnames';

import { Icon } from '../Icon/Icon';

import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  title?: ReactNode;
  onClose?: () => void;
  className?: string;
  contentClassName?: string;
  bodyClassName?: string;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    isOpen,
    onClose,
    className,
    contentClassName,
    bodyClassName,
    title,
    children,
  } = props;

  return (
    <div
      className={cn(styles.container, { [styles.isOpen]: isOpen }, className)}
    >
      <div className={contentClassName}>
        <header className={styles.header}>
          {title && title}

          <Icon name="close" onClick={onClose} />
        </header>

        <div className={bodyClassName}>{children}</div>
      </div>
    </div>
  );
};
