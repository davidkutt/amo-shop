import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

// Define the props for our Button using TypeScript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string; // For custom styling on the button container
  /**
   * --- NEW PROP ---
   * Allows for custom styling on the button's text element.
   */
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                title,
                                                onPress,
                                                variant = 'primary',
                                                size = 'md',
                                                disabled = false,
                                                loading = false,
                                                className = '',
                                                textClassName = '', // Initialize the new prop
                                              }) => {
  // Base styles for the button container and text
  const baseButtonClass =
    'flex-row justify-center items-center active:opacity-80';
  const baseTextClass = 'font-bold';

  // --- Variant Styles ---
  // Note: For our stark design, we will mostly override these with className.
  const variantStyles: {
    [key: string]: { button: string; text: string; indicator: string };
  } = {
    primary: {
      button: 'bg-black',
      text: 'text-white',
      indicator: 'text-white',
    },
    secondary: {
      button: 'bg-gray-200',
      text: 'text-gray-800',
      indicator: 'text-gray-800',
    },
    outline: {
      button: 'bg-transparent border-2 border-black',
      text: 'text-black',
      indicator: 'text-black',
    },
    text: {
      button: 'bg-transparent',
      text: 'text-black',
      indicator: 'text-black',
    },
  };

  // --- Size Styles ---
  const sizeStyles: { [key: string]: { button: string; text: string } } = {
    sm: {
      button: 'py-2 px-3',
      text: 'text-sm',
    },
    md: {
      button: 'py-3 px-5',
      text: 'text-base',
    },
    lg: {
      button: 'py-4 px-7',
      text: 'text-lg',
    },
  };

  // --- State Styles ---
  const disabledClass = 'opacity-50';

  // Combine all classes based on props
  const buttonClasses = `
    ${baseButtonClass}
    ${variantStyles[variant].button}
    ${sizeStyles[size].button}
    ${disabled || loading ? disabledClass : ''}
    ${className}
  `;

  const finaltextClasses = `
    ${baseTextClass}
    ${variantStyles[variant].text}
    ${sizeStyles[size].text}
    ${textClassName} 
  `;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'large'}
          // Note: In NativeWind, ActivityIndicator color must be set with the `color` prop.
          // The className approach for color doesn't work on this component.
          color={variantStyles[variant].indicator}
        />
      ) : (
        // Apply the combined text classes here
        <Text className={finaltextClasses}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
