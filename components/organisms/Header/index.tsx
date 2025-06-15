import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    // The header has a solid background and a thick bottom border for separation
    <View className="w-full bg-[#F0F0E0] border-b-2 border-black flex-row items-center justify-between p-4">
      <Text variant="h1" className="text-black">
        {title}
      </Text>

      {/* The icon buttons are styled to match the card buttons */}
      <View className="flex-row items-center">
        {/* Search Icon Button */}
        <TouchableOpacity onPress={() => Alert.alert('Search Tapped!')}>
          <View>
            <View className="absolute top-1 left-1 w-full h-full bg-black" />
            <View className="relative bg-white border-2 border-black p-2">
              <Icon name="search" size={24} color="black" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Cart Icon Button */}
        <TouchableOpacity onPress={() => Alert.alert('Cart Tapped!')} className="ml-3">
          <View>
            <View className="absolute top-1 left-1 w-full h-full bg-black" />
            <View className="relative bg-white border-2 border-black p-2">
              <Icon name="cart" size={24} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
