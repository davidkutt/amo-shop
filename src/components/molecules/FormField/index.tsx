import React from 'react';
import { View } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';

const formFieldVariant = createVariant<Theme, 'formFieldVariants'>({
  themeKey: 'formFieldVariants',
});

const FormFieldContainer = createRestyleComponent<
  VariantProps<Theme, 'formFieldVariants'> & SpacingProps<Theme>,
  Theme
>([formFieldVariant, spacing]);

const FormFieldLabel = createRestyleComponent<SpacingProps<Theme>, Theme>([spacing]);

const FormFieldError = createRestyleComponent<SpacingProps<Theme>, Theme>([spacing]);

export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  children,
  variant = 'default',
}) => {
  return (
    <FormFieldContainer variant={variant} marginBottom="md">
      {label && (
        <FormFieldLabel marginBottom="xs">
          <Text variant="body" color="textPrimary">
            {label}
            {required && <Text variant="body" color="error"> *</Text>}
          </Text>
        </FormFieldLabel>
      )}
      
      {children}
      
      {error && (
        <FormFieldError marginTop="xs">
          <Text variant="caption" color="error">
            {error}
          </Text>
        </FormFieldError>
      )}
    </FormFieldContainer>
  );
};

export type { FormFieldProps };
