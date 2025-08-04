import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';

// We extend the standard TextInputProps to make our component a flexible wrapper
interface InputProps extends TextInputProps {
  variant?: 'default' | 'error';
  className?: string;
}

export const Input: React.FC<InputProps> = ({
                                              variant = 'default',
                                              className = '',
                                              onFocus,
                                              onBlur,
                                              ...rest
                                            }) => {
  const [isFocused, setIsFocused] = useState(false);

  // --- Base Styles ---
  const baseInputClass =
    'border-2 rounded-lg p-3 text-base text-text ';

  // --- Variant & State Styles ---
  const inputStyles = {
    default: {
      border: 'border-gray-300 dark:border-gray-600',
      focused: 'border-blue-600',
      error: 'border-red-500',
    },
  };

  const getBorderColor = () => {
    if (variant === 'error') return inputStyles.default.error;
    if (isFocused) return inputStyles.default.focused;
    return inputStyles.default.border;
  };

  // Combine all classes
  const combinedClasses = `
    ${baseInputClass}
    ${getBorderColor()}
    ${className}
  `;

  return (
    <TextInput
      className={combinedClasses}
      placeholderTextColor={ '#6B7281'} // gray-400 or gray-500
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e); // Forward the event if a handler is provided
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e); // Forward the event
      }}
      {...rest}
    />
  );
};
