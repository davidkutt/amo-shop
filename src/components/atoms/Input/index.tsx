import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import {
  createRestyleComponent,
  spacing,
  SpacingProps,
  border,
  BorderProps,
  backgroundColor,
  BackgroundColorProps,
  layout,
  LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';

type InputProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  TextInputProps & {
    variant?: 'default' | 'error';
    className?: string;
  };

const InputBase = createRestyleComponent<InputProps, Theme>([
  spacing,
  border,
  backgroundColor,
  layout,
]);

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  className = '',
  ...rest
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          borderColor: 'error',
          borderWidth: 1,
        };
      default:
        return {
          borderColor: 'border',
          borderWidth: 1,
        };
    }
  };

  return (
    <InputBase
      variant={variant}
      backgroundColor="cardBackground"
      borderRadius="m"
      paddingHorizontal="m"
      paddingVertical="s"
      fontSize={16}
      color="textPrimary"
      placeholderTextColor="textTertiary"
      {...getVariantStyles()}
      {...rest}
    />
  );
};

export default Input;
