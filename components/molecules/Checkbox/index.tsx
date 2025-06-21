import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';

interface CheckboxProps {
  /**
   * The current value of the checkbox (true for checked, false for unchecked).
   */
  value: boolean;
  /**
   * A callback function that is invoked when the checkbox is pressed.
   */
  onValueChange: (newValue: boolean) => void;
  /**
   * An optional label to display next to the checkbox.
   */
  label?: string;
  /**
   * If true, the checkbox will be displayed in an invalid (error) state.
   */
  invalid?: boolean;
  /**
   * Custom styles for the container View.
   */
  className?: string;
}

/**
 * A Checkbox component for selection, styled in a stark, minimalist aesthetic.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
                                                    value,
                                                    onValueChange,
                                                    label,
                                                    invalid = false,
                                                    className = '',
                                                  }) => {
  // Determine border color based on the invalid state
  const boxBorderClass = invalid ? 'border-red-600' : 'border-black';

  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      className={`flex-row items-center ${className}`}
      activeOpacity={0.8}
    >
      {/* The visible box of the checkbox */}
      <View
        className={`
          w-5 h-5 border-2 justify-center items-center
          ${boxBorderClass}
          ${value ? 'bg-black' : 'bg-white'}
        `}
      >
        {/* The checkmark icon is only rendered when the value is true */}
        {value && <Icon name="check" size={14} color="white" />}
      </View>

      {/* The optional label */}
      {label && (
        <Text className="text-black text-base ml-3">
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
