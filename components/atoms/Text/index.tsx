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
    h1: 'text-4xl font-extrabold text-gray-900 dark:text-white',
    h2: 'text-3xl font-bold text-gray-900 dark:text-white',
    h3: 'text-xl font-bold text-gray-900 dark:text-white',
    body: 'text-base font-normal text-gray-700 dark:text-gray-300',
    caption: 'text-sm font-normal text-gray-500 dark:text-gray-400',
    link: 'text-base font-medium text-blue-600 dark:text-blue-500 underline',
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
