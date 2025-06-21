import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  className?: string;
}

export default function CustomText({ className, ...rest }: CustomTextProps) {
  return (
    <Text 
      className={`text-black ${className || ''}`}
      {...rest}
    />
  );
} 