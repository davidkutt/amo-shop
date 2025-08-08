import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
  spacing,
  SpacingProps,
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  layout,
  LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';

type ButtonProps = VariantProps<Theme, 'buttonVariants'> &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    title?: string;
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'outline' | 'text';
    size?: 'sm' | 'md' | 'lg';
  };

const ButtonBase = createRestyleComponent<ButtonProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
  createVariant({ themeKey: 'buttonVariants' }),
]);

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: 'm', paddingVertical: 's' };
      case 'lg':
        return { paddingHorizontal: 'xl', paddingVertical: 'l' };
      default:
        return { paddingHorizontal: 'l', paddingVertical: 'm' };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return 'primary';
      case 'text':
        return 'primary';
      default:
        return 'white';
    }
  };

  return (
    <ButtonBase
      variant={variant}
      onPress={onPress}
      disabled={disabled || loading}
      opacity={disabled ? 0.5 : 1}
      {...getSizeStyles()}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : '#93c5fd'} 
        />
      ) : (
        children || (
          <Text 
            variant="body" 
            color={getTextColor()}
            fontWeight="600"
          >
            {title}
          </Text>
        )
      )}
    </ButtonBase>
  );
};

export default Button;
