import { FC } from 'react';

import sprite from './Icons.svg';
import { IconName } from './Icons.types';

export type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  src?: string;
};

export const Icon: FC<IconProps> = (props) => {
  const {
    name,
    className,
    size = 24,
    width,
    height,
    onClick,
    src = sprite,
  } = props;

  return (
    <svg
      onClick={onClick}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox={`0 0 ${width || size} ${height || size}`}
      {...{
        width: width || size,
        height: height || size,
      }}
    >
      <use href={`${src}#${name}`} />
    </svg>
  );
};
