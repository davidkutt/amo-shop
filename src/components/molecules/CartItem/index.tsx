import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

const CartItem = ({ item }) => (
  <View className="flex-row items-center p-4 border-b-2 border-black bg-white">
    <View className="w-24 h-24 border-2 border-black bg-gray-100">
      <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-black uppercase font-bold text-base">{item.name}</Text>
      <Text className="text-black text-sm my-1">Size: M</Text>
      <Text className="text-black font-semibold text-lg">{item.price}</Text>
    </View>
    <View className="items-center">
      <Text className="text-black text-lg font-bold">1</Text>
      <TouchableOpacity onPress={() => {

      }} className="mt-2 p-1">
        <Icon name="trash" size={20} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

export default CartItem;
