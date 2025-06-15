import React from 'react';
import { View, Text, TextInputProps } from 'react-native';
import { Input } from '../../atoms/Input'; // Import our Input atom

// We'll take all the props our Input can accept, and add our own
interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                      label,
                                                      error,
                                                      containerClassName = '',
                                                      ...rest // Pass all other TextInputProps down to the Input
                                                    }) => {
  return (
    <View className={`w-full ${containerClassName}`}>
      <Text className="text-base text-gray-800 dark:text-gray-200 font-medium mb-2">
        {label}
      </Text>

      <Input
        // Automatically set the variant to 'error' if an error message exists
        variant={error ? 'error' : 'default'}
        {...rest}
      />

      {/* Only render the error message if it's provided */}
      {error && (
        <Text className="text-sm text-red-500 mt-2">
          {error}
        </Text>
      )}
    </View>
  );
};
