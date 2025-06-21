import React from 'react';
import { Text } from '../../atoms/Text'; // Assuming you have your Text atom

type CounterSize = 'sm' | 'base' | 'lg';

interface CounterProps {
  /**
   * The content to be displayed inside the counter (e.g., a number).
   */
  children: React.ReactNode;
  /**
   * The size of the counter's text.
   */
  size?: CounterSize;
  /**
   * Custom styles for the Text component.
   */
  className?: string;
}

/**
 * A Counter component used to display a count, styled in a stark, minimalist aesthetic.
 * It displays the count inside parentheses, e.g., (4).
 */
export const Counter: React.FC<CounterProps> = ({
                                                  children,
                                                  size = 'base',
                                                  className = '',
                                                }) => {
  // Define text size classes based on the size prop
  const sizeStyles = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const currentSizeClass = sizeStyles[size];

  return (
    <Text
      className={`
        text-black uppercase font-semibold
        ${currentSizeClass}
        ${className}
      `}
    >
      ({children})
    </Text>
  );
};
