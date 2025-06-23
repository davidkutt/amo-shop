import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { Badge } from '../../molecules/Badge'; // 1. Import the Badge component
import { useCart } from '../../../context/CartContext'; // 2. Import the useCart hook

interface HeaderProps {
  back?: boolean;
}

/**
 * A context-aware Header component that displays cart item count.
 */
export const Header: React.FC<HeaderProps> = ({ back }) => {
  const navigation = useNavigation();
  const { items } = useCart(); // 3. Get the cart items from the context

  const canGoBack = navigation.canGoBack();

  // 4. Calculate the total number of items in the cart
  const cartItemCount = items.length;

  return (
    <View className="w-full bg-white px-4 py-3 border-b border-black">
      <View className="flex-row items-center justify-between">
        {/* Left Icons */}
        <View className="flex-row items-center gap-x-4">
          {back && canGoBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={28} color="black" />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={() => {}}>
                <Icon name="menu" size={28} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Icon name="search" size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Centered Logo */}
        <View>
          <Text className="text-black text-xl font-bold tracking-widest">
            VANGUARD STORE
          </Text>
        </View>

        {/* Right Icon */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            {/* 5. Wrap the Icon with the Badge component */}
            <Badge content={cartItemCount}>
              <Icon name="cart" size={28} color="black" />
            </Badge>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
