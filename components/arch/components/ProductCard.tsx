import React from 'react';
import { View, TouchableOpacity } from 'react-native';
// Link is imported but not used, consider removing if not needed elsewhere in the file
// import { Link } from 'expo-router';
import { Product } from 'components/arch/data/mockData.ts'; // Adjust the import path as necessary
import ImageWrapper from 'components/arch/components/ImageWrapper.tsx';
import CustomText from 'components/arch/components/CustomText.tsx';
import PriceDisplay from 'components/arch/components/PriceDisplay.tsx';

interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity
      // Added flex-1 to fill column width, kept other styles
      className="flex-1 bg-white rounded-lg shadow-md overflow-hidden mb-4 mx-1"
      onPress={() => onPress(product.id)}
    >
      <ImageWrapper
        source={product.imageSource}
        // Replaced aspect-square with a fixed height (e.g., h-36). Adjust as needed.
        className="w-full h-36" // Example: 9rem / 144px height
        resizeMode="cover"
      />
      <View className="p-2">
        {/* Added numberOfLines and ellipsizeMode for better text handling */}
        <CustomText
          className="text-sm font-semibold mb-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {product.name}
        </CustomText>
        <PriceDisplay
          amount={product.price}
          className="text-base"
        />
      </View>
    </TouchableOpacity>
  );
}
