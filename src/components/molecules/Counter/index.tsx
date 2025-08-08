import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  createRestyleComponent,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

type CounterProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    value: number;
    onValueChange: (newValue: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
  };

const CounterBase = createRestyleComponent<CounterProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const Counter: React.FC<CounterProps> = ({
  value,
  onValueChange,
  min = 0,
  max,
  step = 1,
  label,
  ...rest
}) => {
  const handleIncrement = () => {
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      onValueChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onValueChange(newValue);
    }
  };

  return (
    <View {...rest}>
      {label && (
        <Text variant="small" color="textSecondary" marginBottom="xs">
          {label}
        </Text>
      )}
      
      <CounterBase
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor="cardBackground"
        borderRadius="full"
        borderWidth={1}
        borderColor="border"
        paddingHorizontal="m"
        paddingVertical="s"
      >
        <TouchableOpacity
          onPress={handleDecrement}
          disabled={value <= min}
          style={{
            opacity: value <= min ? 0.5 : 1,
          }}
        >
          <Icon
            name="minus"
            size={20}
            color={value <= min ? 'textTertiary' : 'textPrimary'}
          />
        </TouchableOpacity>
        
        <Text
          variant="body"
          fontWeight="600"
          marginHorizontal="l"
          minWidth={40}
          textAlign="center"
        >
          {value}
        </Text>
        
        <TouchableOpacity
          onPress={handleIncrement}
          disabled={max !== undefined && value >= max}
          style={{
            opacity: max !== undefined && value >= max ? 0.5 : 1,
          }}
        >
          <Icon
            name="plus"
            size={20}
            color={max !== undefined && value >= max ? 'textTertiary' : 'textPrimary'}
          />
        </TouchableOpacity>
      </CounterBase>
    </View>
  );
};

export default Counter;
export type { CounterProps };
