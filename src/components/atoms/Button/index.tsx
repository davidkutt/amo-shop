import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

// The props interface remains the same.
interface ButtonProps {
  title?: string; // Title is optional if children are provided
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                title,
                                                children,
                                                onPress,
                                                variant = 'primary',
                                                size = 'md',
                                                disabled = false,
                                                loading = false,
                                                className = '',
                                                textClassName = '',
                                              }) => {
  // --- UPDATED: Base styles for the "Joyful & Playful" design ---
  const baseButtonClass =
    'flex-row justify-center items-center rounded-full transition-transform active:scale-95';
  const baseTextClass = 'font-sans font-bold';

  // --- UPDATED: Variant styles using our new pastel palette ---
  const variantStyles: {
    [key: string]: { button: string; text: string; indicator: string };
  } = {
    primary: {
      button: 'bg-primary',
      text: 'text-white',
      indicator: '#FFFFFF', // White indicator for the primary button
    },
    outline: {
      button: 'bg-transparent border-2 border-primary',
      text: 'text-primary',
      indicator: '#93c5fd', // Primary color for the indicator
    },
    text: {
      button: 'bg-transparent',
      text: 'text-primary',
      indicator: '#93c5fd', // Primary color for the indicator
    },
  };

  // --- UPDATED: Size styles with appropriate padding for rounded buttons ---
  const sizeStyles: { [key: string]: { button: string; text: string } } = {
    sm: {
      button: 'py-2 px-4',
      text: 'text-sm',
    },
    md: {
      button: 'py-3 px-6',
      text: 'text-base',
    },
    lg: {
      button: 'py-4 px-8',
      text: 'text-lg',
    },
  };

  const disabledClass = 'opacity-50';

  // The logic for combining classes remains the same.
  const buttonClasses = `
    ${baseButtonClass}
    ${variantStyles[variant].button}
    ${sizeStyles[size].button}
    ${disabled || loading ? disabledClass : ''}
    ${className}
  `;

  const finalTextClasses = `
    ${baseTextClass}
    ${variantStyles[variant].text}
    ${sizeStyles[size].text}
    ${textClassName} 
  `;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={1} // We use `active:scale-95` instead
      className={buttonClasses}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'large'}
          color={variantStyles[variant].indicator}
        />
      ) : (
        <Text className={finalTextClasses}>{title || children}</Text>
      )}
    </TouchableOpacity>
  );
};
