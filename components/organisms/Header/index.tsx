import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';

interface HeaderProps {
  // We can define the props for clarity
  back?: boolean;
}

/**
 * A context-aware Header component that can display a back button or default menu actions.
 * It uses the useNavigation hook to control navigation actions.
 */
export const Header: React.FC<HeaderProps> = ({ back }) => {
  // --- THIS IS THE FIX ---
  // We've destructured `{ back }` from the props object.
  const navigation = useNavigation();

  // We can determine if a "back" button should be shown by checking the navigation state.
  const canGoBack = navigation.canGoBack();

  return (
    <View className="w-full bg-white px-4 py-3 border-b border-black">
      <View className="flex-row items-center justify-between">
        {/* The condition now correctly checks the boolean `back` prop */}
        <View className="flex-row items-center gap-x-4">
          {back && canGoBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={28} color="black" />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={() => Alert.alert('Menu Tapped!')}>
                <Icon name="menu" size={28} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Search Tapped!')}>
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

        {/* Right Icon now also uses the hook */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            <Icon name="cart" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
