import React from 'react';
import {
  createRestyleComponent,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { useTheme } from '@shopify/restyle';
import { IconComponent, IconName } from './icons';

type IconContainerProps = SpacingProps<Theme> & LayoutProps<Theme>;

type IconProps = IconContainerProps & {
    name: IconName;
    size?: number;
  color?: keyof Theme['colors'] | string;
  fill?: keyof Theme['colors'] | string;
    className?: string;
  };

const IconBase = createRestyleComponent<IconContainerProps, Theme>([
  spacing,
  layout,
]);

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'textPrimary',
  fill = 'transparent',
  className,
  ...rest
}) => {
  const theme = useTheme<Theme>();

  const resolveColor = (c?: keyof Theme['colors'] | string) => {
    if (!c) return undefined;
    if (typeof c === 'string' && (theme.colors as any)[c]) {
      return (theme.colors as any)[c];
    }
    return c as string;
  };

  return (
    <IconBase {...rest}>
      <IconComponent
        name={name}
        size={size}
        color={resolveColor(color)}
        fill={resolveColor(fill)}
        className={className}
      />
    </IconBase>
  );
};

export default Icon;
