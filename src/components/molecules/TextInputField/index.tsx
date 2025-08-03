import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Text } from 'components/atoms/Text';

interface TextInputFieldProps extends TextInputProps {
  label: string;
}

/**
 * A styled text input field with a label for use in forms.
 */
export const TextInputField: React.FC<TextInputFieldProps> = ({ label, ...props }) => {
  return (
    <View className="w-full">
      <Text className="text-black uppercase font-bold text-xs mb-1">
        {label}
      </Text>
      <TextInput
        className="w-full bg-white border-2 border-black p-3 text-base text-black"
        placeholderTextColor="#9CA3AF" // A standard gray for placeholders
        {...props}
      />
    </View>
  );
};
