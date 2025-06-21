import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { useWishlist } from '../../../context/WishlistContext'; // 1. Import the hook

interface Product {
  id: string;
  name: string;
  preOrderText?: string;
  colorCount?: number;
  price: string; // Changed to string to match data
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  // We use index to apply borders correctly to form a grid
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                          product,
                                                          onPress,
                                                          index,
                                                        }) => {
  // 2. Get the wishlist functions and state from our context
  const { toggleWishlist, isItemInWishlist } = useWishlist();
  const isFavorited = isItemInWishlist(product.id);

  const handleBookmarkPress = () => {
    // Stop the event from triggering the card's main onPress
    toggleWishlist(product.id);
  };

  const borderClass = index % 2 === 0 ? 'border-r-2 border-black' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-1/2 bg-white p-2 pb-4 border-b-2 border-black ${borderClass}`}
    >
      <View className="relative">
        <View className="w-full aspect-square bg-gray-100">
          <Image
            source={{ uri: product.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Icons are positioned absolutely within the image container */}
        <View className="absolute top-2 right-2 flex-col items-center gap-y-2">
          <Icon name="video-camera" size={24} color="black" />

          {/* 3. Make the bookmark icon a functional button */}
          <TouchableOpacity onPress={handleBookmarkPress}>
            <Icon
              name="bookmark"
              size={24}
              color="black"
              // 4. Conditionally fill the icon based on its wishlist status
              fill={isFavorited ? 'black' : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Info */}
      <View className="mt-3">
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
        {product.colorCount && (
          <Text className="text-black text-center text-xs my-1">
            {product.colorCount} Farben
          </Text>
        )}
        <Text className="text-black text-center text-sm font-semibold mt-1">
          {product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
