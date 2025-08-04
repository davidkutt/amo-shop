import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
  useSharedValue,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';
import { useScroll } from 'context/ScrollContext';

interface HeaderProps {
  back?: boolean;
}

/**
 * A dynamic Header component that shrinks and hides the logo when scrolling.
 * It maintains navigation functionality while providing more content space.
 */
export const Header: React.FC<HeaderProps> = ({ back }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const { scrollY } = useScroll();

  // Animated styles for the header container
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 100],
      [80, 60], // From 80px to 60px height
      Extrapolate.CLAMP
    );

    return {
      height,
    };
  });

  // Animated styles for the logo
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0], // Fade out the logo
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0.8], // Slightly scale down
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  // Animated styles for the navigation elements
  const navAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -10], // Move up slightly
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View className="w-full bg-background" style={headerAnimatedStyle}>
      <Animated.View 
        className="w-full flex-row items-center justify-between p-4 border-b border-text/20"
        style={navAnimatedStyle}
      >
        <View className="flex-1 justify-start">
          {back && canGoBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={28} color="#334155" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Alert.alert('Search Tapped!')}>
              <Icon name="search" size={24} color="#334155" />
            </TouchableOpacity>
          )}
        </View>

        {/* Centered Logo - Animated to disappear on scroll */}
        <Animated.View className="flex-2 items-center" style={logoAnimatedStyle}>
          <Text className="text-2xl text-center" variant="title">
            Herzenshund
          </Text>
        </Animated.View>

        {/* Right Icons */}
        <View className="flex-1 flex-row justify-end items-center gap-x-4">
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            <Icon name="cart" size={24} color="#334155" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
