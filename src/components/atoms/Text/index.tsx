import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

// Re-introducing the variant prop for different text styles
interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'small';
  children: React.ReactNode;
  className?: string;
}

/**
 * A Text component with built-in variants for the "Joyful & Playful" design system.
 * It uses a switch statement to ensure NativeWind can detect all class combinations.
 */
export const Text: React.FC<TextProps> = ({
                                            variant = 'body',
                                            children,
                                            className = '', // This will be used for overrides
                                            ...rest
                                          }) => {
  switch (variant) {
    case 'title':
      return (
        <RNText
          className={`text-sans text-3xl font-extrabold text-slate-800 ${className}`}
          {...rest}
        >
          {children}
        </RNText>
      );
    case 'subtitle':
      return (
        <RNText
          className={`text-sans text-xl font-bold text-slate-700 ${className}`}
          {...rest}
        >
          {children}
        </RNText>
      );
    case 'small':
      return (
        <RNText
          className={`text-sans text-sm font-medium text-slate-500 ${className}`}
          {...rest}
        >
          {children}
        </RNText>
      );
    case 'body':
    default:
      return (
        <RNText
          className={`text-sans text-base font-normal text-slate-600 ${className}`}
          {...rest}
        >
          {children}
        </RNText>
      );
  }
};
