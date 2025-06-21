import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../atoms/Text';

type ChipSize = 'sm' | 'base';

interface ChipProps {
  /**
   * The text content to display inside the chip.
   */
  children: React.ReactNode;
  /**
   * If true, the chip will be displayed in a selected state.
   */
  selected?: boolean;
  /**
   * A callback function that is invoked when the chip is pressed.
   */
  onPress: () => void;
  /**
   * The size of the chip, affecting padding and text size.
   */
  size?: ChipSize;
  /**
   * An optional element, like an icon, to display before the text.
   */
  slotPrefix?: React.ReactNode;
  /**
   * An optional element, like an icon, to display after the text.
   */
  slotSuffix?: React.ReactNode;
  /**
   * Custom styles for the container TouchableOpacity.
   */
  className?: string;
}

/**
 * A Chip component used for selection or filtering, styled in a stark, minimalist aesthetic.
 */
export const Chip: React.FC<ChipProps> = ({
                                            children,
                                            selected = false,
                                            onPress,
                                            size = 'base',
                                            slotPrefix,
                                            slotSuffix,
                                            className = '',
                                          }) => {
  // --- Define styles based on props ---

  // Size classes for padding and text
  const sizeStyles = {
    sm: {
      container: 'py-1 px-3 gap-x-1.5',
      text: 'text-xs',
    },
    base: {
      container: 'py-2 px-4 gap-x-2',
      text: 'text-sm',
    },
  };

  // State classes for selected/unselected appearance
  const stateStyles = {
    selected: {
      container: 'bg-black border-black',
      text: 'text-white',
    },
    unselected: {
      container: 'bg-white border-black',
      text: 'text-black',
    },
  };

  const currentSize = sizeStyles[size];
  const currentState = selected ? stateStyles.selected : stateStyles.unselected;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        border-2 inline-flex flex-row items-center justify-center
        ${currentState.container}
        ${currentSize.container}
        ${className}
      `}
      activeOpacity={0.8}
    >
      {slotPrefix && <View>{slotPrefix}</View>}

      <Text className={`${currentState.text} ${currentSize.text} font-semibold uppercase`}>
        {children}
      </Text>

      {slotSuffix && <View>{slotSuffix}</View>}
    </TouchableOpacity>
  );
};
