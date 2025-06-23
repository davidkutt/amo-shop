import React from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms/Text'; // Assuming you have your Text atom

type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface BadgeProps {
  /**
   * The content to be displayed inside the badge (e.g., a number).
   */
  content?: string | number;
  /**
   * The variant of the badge, either showing content or a simple dot.
   */
  variant?: 'standard' | 'dot';
  /**
   * The maximum number to display. If content is higher, it shows as `${max}+`.
   */
  max?: number;
  /**
   * The placement of the badge relative to its container.
   */
  placement?: BadgePlacement;
  /**
   * The component that the badge will be placed on top of.
   */
  children?: React.ReactNode;
  /**
   * Custom styles for the container.
   */
  className?: string;
}

/**
 * A Badge component to display notifications or status in a stark, minimalist style.
 */
export const Badge: React.FC<BadgeProps> = ({
                                              children,
                                              content,
                                              variant = 'standard',
                                              max = 99,
                                              placement = 'top-right',
                                              className = '',
                                            }) => {
  const isDot = variant === 'dot';
  let displayValue: string | number = '';

  // Determine the display value based on content and max props
  if (!isDot) {
    if (typeof content === 'number' && content > max) {
      displayValue = `${max}+`;
    } else {
      displayValue = content || '';
    }
  }

  // Define positioning classes based on placement prop
  const placementClasses = {
    'top-right': 'top-0 right-0 -translate-y-1/2 translate-x-1/2',
    'top-left': 'top-0 left-0 -translate-y-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0 translate-y-1/2 translate-x-1/2',
    'bottom-left': 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2',
  };

  const badgeSizeClass = isDot
    ? 'w-2.5 h-2.5' // Smaller size for the dot variant
    : 'min-w-[20px] h-[20px] px-1'; // Size for the standard variant with text

  return (
    <View className={`relative ${className}`}>
      {/* The main component (e.g., an Icon) */}
      {children}

      {/* The Badge itself, only rendered if it has content or is a dot */}
      {(displayValue || isDot) && (
        <View
          className={`
            absolute bg-black rounded-full justify-center items-center
            ${badgeSizeClass}
            ${placementClasses[placement]}
          `}
        >
          {!isDot && (
            <Text className="text-white text-[11px] font-bold">
              {displayValue}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
