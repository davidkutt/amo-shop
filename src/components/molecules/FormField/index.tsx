import React from 'react';
import { View, Text, TextInputProps } from 'react-native';
import { Input } from 'components/atoms/Input'; // Import our Input atom

// We'll take all the props our Input can accept, and add our own
interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, error }) => {
  return (
    <View className="mb-4">
      <Text className="text-base text-text font-medium mb-2">
        {label}
      </Text>
      {children}
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
