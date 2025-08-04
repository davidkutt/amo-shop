import React from 'react';
import {
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Text } from 'components/atoms/Text';

// This enables LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface SwitchProps {
  /**
   * The current value of the switch (true for on, false for off).
   */
  value: boolean;
  /**
   * A callback function that is invoked when the switch is pressed.
   */
  onValueChange: (newValue: boolean) => void;
  /**
   * An optional label to display next to the switch.
   */
  label?: string;
  /**
   * Custom styles for the container View.
   */
  className?: string;
}

/**
 * A Switch component for toggling states, styled in a stark, minimalist aesthetic.
 */
export const Switch: React.FC<SwitchProps> = ({
                                                value,
                                                onValueChange,
                                                label,
                                                className = '',
                                              }) => {
  const handleToggle = () => {
    // Animate the layout change for a smooth slide effect
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onValueChange(!value);
  };

  // Determine styles based on the on/off state
  const trackBgClass = value ? 'bg-black' : 'bg-white';
  const thumbBgClass = value ? 'bg-white' : 'bg-black';
  const thumbPositionClass = value ? 'justify-end' : 'justify-start';

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className={`flex-row items-center ${className}`}
      activeOpacity={1}
    >
      {/* The track of the switch */}
      <View
        className={`
          w-12 h-7 p-0.5 border-2 border-black
          flex-row items-center
          ${trackBgClass}
          ${thumbPositionClass}
        `}
      >
        {/* The sliding thumb */}
        <View className={`w-5 h-5 ${thumbBgClass}`} />
      </View>

      {/* The optional label */}
      {label && (
        <Text className="text-text text-base ml-3 font-semibold">
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
