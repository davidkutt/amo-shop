import React from 'react';
import {
  createRestyleComponent,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { IconComponent, IconName } from './icons';

type IconProps = SpacingProps<Theme> &
  LayoutProps<Theme> & {
    name: IconName;
    size?: number;
    color?: string;
    fill?: string;
    className?: string;
  };

const IconBase = createRestyleComponent<IconProps, Theme>([
  spacing,
  layout,
]);

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#334155',
  fill = 'none',
  className,
  ...rest
}) => {
  return (
    <IconBase {...rest}>
      <IconComponent
        name={name}
        size={size}
        color={color}
        fill={fill}
        className={className}
      />
    </IconBase>
  );
};

export default Icon;
