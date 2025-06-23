import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

// We extend the base React Native TextProps
interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'link';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
                                            variant = 'body',
                                            children,
                                            className = '',
                                            ...rest
                                          }) => {
  // --- Typography Scale ---
  // This maps our variant names to NativeWind classes.
  // This is where you define your app's visual hierarchy.
  const variantStyles = {
    h1: 'text-4xl font-extrabold text-gray-900 ',
    h2: 'text-3xl font-bold text-gray-900',
    h3: 'text-xl font-bold text-gray-900 ',
    body: 'text-base font-normal text-gray-700',
    caption: 'text-sm font-normal text-gray-500 ',
    link: 'text-base font-medium text-blue-600  underline',
  };

  const combinedClasses = `
    ${variantStyles[variant]}
    ${className}
  `;

  return (
    <RNText className={combinedClasses} {...rest}>
      {children}
    </RNText>
  );
};
