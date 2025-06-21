import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  className?: string;
}

export default function CustomInput({ className, ...rest }: CustomInputProps) {
  return (
    <TextInput
      className={`border border-gray-300 rounded-md px-3 py-2 ${className || ''}`}
      {...rest}
    />
  );
} 