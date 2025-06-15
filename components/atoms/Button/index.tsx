import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  const { colorScheme } = useColorScheme();

  // Special case for Neubrutalism's unique structure
  if (colorScheme === 'neubrutalism') {
    return (
      <View>
        {/* The shadow uses our semantic 'shadow' color */}
        <View className="absolute top-1 left-1 w-full h-full bg-shadow" />
        <TouchableOpacity
          onPress={onPress}
          // The button uses our semantic theme colors via className!
          className="bg-primary border-2 border-border p-3 items-center"
        >
          <Text className="text-text font-bold">{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Default button for other themes
  return (
    <TouchableOpacity
      onPress={onPress}
      // Look how clean this is! It will automatically get the right colors.
      className="bg-primary border border-border rounded-lg p-3 items-center"
    >
      <Text className="text-text font-bold">{title}</Text>
    </TouchableOpacity>
  );
};
