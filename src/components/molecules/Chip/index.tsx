import React from 'react';
import { TouchableOpacity } from 'react-native';
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

type ChipProps = VariantProps<Theme, 'chipVariants'> &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    children: React.ReactNode;
    onPress: () => void;
    selected?: boolean;
    size?: 'sm' | 'base';
    slotPrefix?: React.ReactNode;
    slotSuffix?: React.ReactNode;
  };

const ChipBase = createRestyleComponent<ChipProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
  createVariant({ themeKey: 'chipVariants' }),
]);

export const Chip: React.FC<ChipProps> = ({
  children,
  onPress,
  selected = false,
  size = 'base',
  slotPrefix,
  slotSuffix,
  ...rest
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: 's',
          paddingVertical: 'xs',
          borderRadius: 'full',
        };
      case 'base':
      default:
        return {
          paddingHorizontal: 'm',
          paddingVertical: 's',
          borderRadius: 'full',
        };
    }
  };

  const getVariant = () => {
    return selected ? 'selected' : 'default';
  };

  return (
    <ChipBase
      variant={getVariant()}
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      {...getSizeStyles()}
      {...rest}
    >
      {slotPrefix && (
        <Text
          variant="small"
          color={selected ? 'white' : 'textPrimary'}
          marginRight="xs"
        >
          {slotPrefix}
        </Text>
      )}
      <Text
        variant="small"
        color={selected ? 'white' : 'textPrimary'}
        fontWeight={selected ? '600' : '500'}
      >
        {children}
      </Text>
      {slotSuffix && (
        <Text
          variant="small"
          color={selected ? 'white' : 'textPrimary'}
          marginLeft="xs"
        >
          {slotSuffix}
        </Text>
      )}
    </ChipBase>
  );
};

export default Chip;
export type { ChipProps };
