import React from 'react';
import { Text } from 'components/atoms/Text';

type CounterSize = 'sm' | 'base' | 'lg';

interface CounterProps {
  children: React.ReactNode;
  size?: CounterSize;
  className?: string;
}

/**
 * A Counter component redesigned in a warm, elegant aesthetic.
 */
export const Counter: React.FC<CounterProps> = ({
                                                  children,
                                                  size = 'base',
                                                  className = '',
                                                }) => {
  const sizeStyles = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const currentSizeClass = sizeStyles[size];

  return (
    <Text
      className={`
        text-text font-medium
        ${currentSizeClass}
        ${className}
      `}
    >
      ({children})
    </Text>
  );
};
