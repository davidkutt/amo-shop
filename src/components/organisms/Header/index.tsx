import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

interface HeaderProps {
  back?: boolean;
}

/**
 * A sophisticated Header component styled in a warm, elegant aesthetic.
 * It includes a top announcement bar and a main navigation bar.
 */
export const Header: React.FC<HeaderProps> = ({ back }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
      <View className="w-full bg-white">
        <View className="w-full flex-row items-center justify-between p-4 border-b border-gray-200">
          <View className="flex-1 justify-start">
            {back && canGoBack ? (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-left" size={28} color="#36454F" />
                </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => Alert.alert('Search Tapped!')}>
                <Icon name="search" size={24} color="#36454F" />
              </TouchableOpacity>
            )}
          </View>

          {/* Centered Logo (Using a Serif font style) */}
          <View className="flex-2 items-center">
            <Text  className="text-2xl text-center" variant={"title"}>
              Herzenshund
            </Text>
          </View>

          {/* Right Icons */}
          <View className="flex-1 flex-row justify-end items-center gap-x-4">
            <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
              {/* You could add a Badge here if desired */}
              <Icon name="cart" size={24} color="#36454F" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};
