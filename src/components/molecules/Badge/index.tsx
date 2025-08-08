import React from 'react';
import { View } from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';

type BadgeProps = VariantProps<Theme, 'badgeVariants'> &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    children: React.ReactNode;
    content?: string | number;
    max?: number;
    placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  };

const BadgeBase = createRestyleComponent<BadgeProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
  createVariant({ themeKey: 'badgeVariants' }),
]);

export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  max = 99,
  placement = 'top-right',
  variant = 'standard',
  ...rest
}) => {
  const getPlacementStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      zIndex: 10,
    };

    switch (placement) {
      case 'top-right':
        return { ...baseStyles, top: -8, right: -8 };
      case 'top-left':
        return { ...baseStyles, top: -8, left: -8 };
      case 'bottom-right':
        return { ...baseStyles, bottom: -8, right: -8 };
      case 'bottom-left':
        return { ...baseStyles, bottom: -8, left: -8 };
      default:
        return { ...baseStyles, top: -8, right: -8 };
    }
  };

  const getContent = () => {
    if (typeof content === 'number' && content > max) {
      return `${max}+`;
    }
    return content;
  };

  return (
    <View style={{ position: 'relative' }}>
      {children}
      {content && (
        <BadgeBase
          variant={variant}
          backgroundColor="accent1"
          borderRadius="full"
          minWidth={20}
          height={20}
          justifyContent="center"
          alignItems="center"
          paddingHorizontal="xs"
          {...getPlacementStyles()}
          {...rest}
        >
          <Text
            variant="small"
            color="white"
            fontWeight="600"
            textAlign="center"
          >
            {getContent()}
          </Text>
        </BadgeBase>
      )}
    </View>
  );
};

export default Badge;
export type { BadgeProps };
