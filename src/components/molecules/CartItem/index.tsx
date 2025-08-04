import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

const CartItem = ({ item }) => (
  <View className="flex-row items-center p-4 border-b-2 border-text/20 bg-background">
    <View className="w-24 h-24 border-2 border-text/20 bg-gray-100">
      <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
    </View>
    <View className="flex-1 ml-4">
      <Text variant="body" className="font-semibold">{item.name}</Text>
      <Text variant="small" className="my-1">Size: M</Text>
      <Text variant="body" className="font-semibold">{item.price}</Text>
    </View>
    <View className="items-center">
      <Text variant="body" className="font-semibold">1</Text>
      <TouchableOpacity onPress={() => {

      }} className="mt-2 p-1">
        <Icon name="trash" size={20} color="#334155" />
      </TouchableOpacity>
    </View>
  </View>
);

export default CartItem;
