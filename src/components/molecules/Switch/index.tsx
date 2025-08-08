import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';

const switchVariant = createVariant<Theme, 'switchVariants'>({
  themeKey: 'switchVariants',
});

const SwitchContainer = createRestyleComponent<
  VariantProps<Theme, 'switchVariants'> & SpacingProps<Theme>,
  Theme
>([switchVariant, spacing]);

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  label,
  size = 'md',
}) => {
  const getSwitchSize = () => {
    switch (size) {
      case 'sm': return { width: 36, height: 20, thumbSize: 16 };
      case 'lg': return { width: 52, height: 28, thumbSize: 24 };
      default: return { width: 44, height: 24, thumbSize: 20 };
    }
  };

  const switchSize = getSwitchSize();

  return (
    <SwitchContainer 
      variant="default" 
      flexDirection="row" 
      alignItems="center" 
      gap="sm"
      opacity={disabled ? 0.5 : 1}
    >
      {label && (
        <Text variant="body" color="textPrimary" flex={1}>
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        onPress={() => !disabled && onValueChange(!value)}
        disabled={disabled}
        style={{
          width: switchSize.width,
          height: switchSize.height,
          borderRadius: switchSize.height / 2,
          backgroundColor: value ? '#4F46E5' : '#E5E7EB',
          justifyContent: 'center',
          paddingHorizontal: 2,
        }}
      >
        <Animated.View
          style={{
            width: switchSize.thumbSize,
            height: switchSize.thumbSize,
            borderRadius: switchSize.thumbSize / 2,
            backgroundColor: 'white',
            transform: [{
              translateX: value ? switchSize.width - switchSize.thumbSize - 2 : 0
            }],
          }}
        />
      </TouchableOpacity>
    </SwitchContainer>
  );
};

export type { SwitchProps };
