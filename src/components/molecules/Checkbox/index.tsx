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

type CheckboxProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    label?: string;
    invalid?: boolean;
  };

const CheckboxBase = createRestyleComponent<CheckboxProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onValueChange,
  label,
  invalid = false,
  ...rest
}) => {
  return (
    <View flexDirection="row" alignItems="center" {...rest}>
      <TouchableOpacity
        onPress={() => onValueChange(!value)}
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: invalid ? '#ef4444' : value ? '#93c5fd' : '#d1d5db',
          backgroundColor: value ? '#93c5fd' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: label ? 8 : 0,
        }}
      >
        {value && (
          <Icon name="check" size={14} color="white" />
        )}
      </TouchableOpacity>
      
      {label && (
        <TouchableOpacity onPress={() => onValueChange(!value)}>
          <Text
            variant="body"
            color={invalid ? 'error' : 'textPrimary'}
            marginLeft="s"
          >
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Checkbox;
export type { CheckboxProps };
