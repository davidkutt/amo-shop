import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { useTheme } from '../../../context/ThemeContext';
import { BlurView } from '@react-native-community/blur';
import { Button } from '../../atoms/Button'; // Assuming you have a theme-aware Button

/**
 * The data structure for a product.
 * Optional fields are included to support different themes.
 */
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  preOrderText?: string;
  colorCount?: number;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  // Index is needed for the 'stark' theme to calculate borders correctly
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                          product,
                                                          onPress,
                                                          index,
                                                        }) => {
  // Use our custom hook to get the current theme name
  const { themeName } = useTheme();

  const handleAddToCart = () => {
    // Stop the press event from bubbling up to the main card's onPress
    Alert.alert('Added to Cart!', `${product.name} has been added to your cart.`);
  };

  // --- RENDER LOGIC BASED ON THEME ---

  // --- Theme 1: Stark Minimalism (Balenciaga-inspired) ---
  if (themeName === 'stark') {
    const borderClass = index % 2 === 0 ? 'border-r-2 border-black' : '';
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`w-1/2 bg-white p-2 pb-4 border-b-2 border-black ${borderClass}`}
      >
        <View className="relative mb-3">
          <View className="w-full aspect-square bg-gray-100">
            <Image
              source={{ uri: product.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="absolute top-2 right-2 flex-col items-center gap-y-2">
            <Icon name="video-camera" size={24} color="black" />
            <Icon name="bookmark" size={24} color="black" />
          </View>
        </View>
        <View className="flex-row justify-center items-center mb-2">
          <View className="w-1.5 h-1.5 bg-black rounded-full mx-1" />
          <View className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-1" />
        </View>
        <Text className="text-black text-center uppercase font-semibold text-sm tracking-wider">
          {product.name}
        </Text>
        {product.preOrderText && (
          <Text className="text-blue-600 text-center uppercase text-xs tracking-wider my-1">
            {product.preOrderText}
          </Text>
        )}
        <Text className="text-black text-center text-sm font-semibold mt-1">
          {product.price}
        </Text>
      </TouchableOpacity>
    );
  }

  // --- Theme 2: Neubrutalism ---
  if (themeName === 'neubrutalism') {
    return (
      <View className="w-1/2 p-2">
        <View className="w-full">
          <View className="absolute top-1.5 left-1.5 w-full h-full bg-black" />
          <TouchableOpacity onPress={onPress} className="w-full bg-[#F0F0E0] border-2 border-black p-3">
            <View className="w-full aspect-square bg-white border-2 border-black mb-3">
              <Image source={{ uri: product.imageUrl }} className="w-full h-full" resizeMode="cover" />
            </View>
            <Text className="text-black font-bold text-base" numberOfLines={1}>{product.name}</Text>
            <Text className="text-black font-semibold text-lg my-2">{product.price}</Text>
            <Button title="Add to Cart" onPress={handleAddToCart} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- Theme 3: Glassmorphism (Default Fallback) ---
  return (
    <View className="w-1/2 p-2">
      <TouchableOpacity
        onPress={onPress}
        className="w-full aspect-[3/4] rounded-2xl overflow-hidden"
      >
        <ImageBackground
          source={{ uri: product.imageUrl }}
          className="w-full h-full justify-end"
        >
          <BlurView blurType="dark" blurAmount={10}>
            <View className="p-3 border-t border-white/30">
              <Text className="text-white font-bold text-base" numberOfLines={1}>
                {product.name}
              </Text>
              <Text className="text-white font-semibold text-lg my-1">
                {product.price}
              </Text>
              <Button title="Add to Cart" onPress={handleAddToCart} />
            </View>
          </BlurView>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
