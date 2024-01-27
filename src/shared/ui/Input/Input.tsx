import React, { FC, ReactNode, useState } from 'react';
import cn from 'classnames';

import { Icon } from '../Icon/Icon';
import { IconName } from '../Icon/Icons.types';

import styles from './Input.module.scss';

type InputProps = {
  placeholder?: string;
  className?: string;
  iconName?: IconName;
  onChange: (newValue: string) => void;
  label?: string;
  value: string;
  rtl?: boolean;
};

export const Input: FC<InputProps> = (props) => {
  const {
    placeholder,
    className,
    iconName,
    onChange,
    label,
    value,
    rtl = false,
  } = props;

  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      {label && <p className={cn(styles.label, 'p5')}>{label}</p>}

      <div
        className={cn(
          styles.inputContainer,
          { [styles.rtl]: rtl, [styles.focused]: focused },
          className,
        )}
        tabIndex={1}
      >
        {iconName && <Icon name={iconName} size={16} className={styles.icon} />}

        <input
          className={styles.input}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
