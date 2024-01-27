import React, { FC, PropsWithChildren } from 'react';

import styles from './Button.module.scss';
import cn from 'classnames';
import { Icon } from '@/shared/ui';
import { IconName } from '@/shared/ui/Icon/Icons.types';

type ButtonProps = {
  className?: string;
  variant?: 'primary' | 'secondary';
  focused?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  corner?: 'brick' | 'rounded';
  icon?: IconName;
  size?: 'small' | 'medium';
  rtl?: boolean;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    className,
    variant = 'primary',
    focused,
    disabled,
    onClick,
    corner = 'brick',
    icon,
    size = 'medium',
    rtl,
    children,
  } = props;

  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        styles[corner],
        { [styles.rtl]: rtl, [styles.focused]: focused },
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={18} className={styles.icon} />}

      <p className={cn(styles.text, size === 'medium' ? 'p4' : 'p6')}>
        {children}
      </p>
    </button>
  );
};
