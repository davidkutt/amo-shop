import React, { useState } from 'react';
import { View } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Input } from 'components/atoms/Input';
import { Icon } from 'components/atoms/Icon';
import { Text } from 'components/atoms/Text';

const textInputFieldVariant = createVariant<Theme, 'textInputFieldVariants'>({
  themeKey: 'textInputFieldVariants',
});

const TextInputFieldContainer = createRestyleComponent<
  VariantProps<Theme, 'textInputFieldVariants'> & SpacingProps<Theme>,
  Theme
>([textInputFieldVariant, spacing]);

export interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  required = false,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  onRightIconPress,
  disabled = false,
  variant = 'default',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      onRightIconPress?.();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return isPasswordVisible ? 'eye-off' : 'eye';
    }
    return rightIcon;
  };

  return (
    <TextInputFieldContainer variant={variant}>
      {label && (
        <Text variant="body" color="textPrimary" marginBottom="xs">
          {label}
          {required && <Text variant="body" color="error"> *</Text>}
        </Text>
      )}
      
      <View style={{ position: 'relative' }}>
        {leftIcon && (
          <View style={{ 
            position: 'absolute', 
            left: 12, 
            top: 0, 
            bottom: 0, 
            justifyContent: 'center',
            zIndex: 1 
          }}>
            <Icon name={leftIcon} size={20} color="textSecondary" />
          </View>
        )}
        
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={numberOfLines}
          disabled={disabled}
          variant={error ? 'error' : 'default'}
          style={{
            paddingLeft: leftIcon ? 40 : 12,
            paddingRight: (rightIcon || secureTextEntry) ? 40 : 12,
          }}
        />
        
        {(rightIcon || secureTextEntry) && (
          <View style={{ 
            position: 'absolute', 
            right: 12, 
            top: 0, 
            bottom: 0, 
            justifyContent: 'center',
            zIndex: 1 
          }}>
            <Icon 
              name={getRightIcon() || 'eye'} 
              size={20} 
              color="textSecondary"
              onPress={handleRightIconPress}
            />
          </View>
        )}
      </View>
      
      {error && (
        <Text variant="caption" color="error" marginTop="xs">
          {error}
        </Text>
      )}
    </TextInputFieldContainer>
  );
};

export type { TextInputFieldProps };
