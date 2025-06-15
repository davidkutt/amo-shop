import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../atoms/Text';

interface ColorSelectorProps {
  label?: string;
  // An array of available color hex codes
  colors: string[];
  // The currently selected color
  selectedColor: string;
  // Callback function to update the selected color in the parent component
  onSelectColor: (color: string) => void;
  containerClassName?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
                                                              label,
                                                              colors,
                                                              selectedColor,
                                                              onSelectColor,
                                                              containerClassName = '',
                                                            }) => {
  return (
    <View className={containerClassName}>
      {label && (
        <Text variant="body" className="mb-2">
          {label}: <Text className="font-bold">{selectedColor}</Text>
        </Text>
      )}

      <View className="flex-row items-center">
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          // We'll use an outer View to create a border effect
          return (
            <TouchableOpacity
              key={color}
              onPress={() => onSelectColor(color)}
              className={`
                h-10 w-10 rounded-full justify-center items-center mr-3 border-2
                ${isSelected ? 'border-blue-600' : 'border-transparent'}
              `}
            >
              <View
                style={{ backgroundColor: color }}
                className="h-8 w-8 rounded-full border border-gray-300"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
