// /Users/david/htdocs/AMOShop/src/components/organisms/ProductCard/index.tsx
import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';
import { useWishlist } from 'context/WishlistContext.tsx';
import { useCart } from 'context/CartContext.tsx';

// The Product interface is updated to include the handle and variantId
interface Product {
  id: string; // The global product ID
  handle: string; // The product's unique handle for navigation
  variantId: string; // The specific variant ID for cart operations
  name: string;
  price: string; // e.g., "84.90 EUR" or "69.9 EUR"
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  className?: string;
}

/**
 * A Product Card redesigned in the "Warm & Elegant Minimalism" style.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
                                                          product,
                                                          onPress,
                                                          className = '',
                                                        }) => {
  const { toggleWishlist, isItemInWishlist } = useWishlist();
  const { addItem } = useCart();
  const isFavorited = isItemInWishlist(product.id);

  const handleWishlistPress = () => {
    toggleWishlist(product.id);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  /**
   * Formats a price string (e.g., "84.90 EUR" or "69.9 EUR")
   * to German locale format (e.g., "84,90 EUR" or "69,90 EUR").
   * Ensures two decimal places and uses a comma as the decimal separator.
   */
  const formatPriceForGermanLocale = (priceString: string): string => {
    const parts = priceString.split(' ');
    if (parts.length < 2) {
      // If the format is unexpected, return the original string to avoid errors.
      // In a real app, you might want more robust error handling or logging.
      return priceString;
    }

    const amountStr = parts[0]; // e.g., "84.90" or "69.9"
    const currencyCode = parts[1]; // e.g., "EUR"

    const amount = parseFloat(amountStr);

    if (isNaN(amount)) {
      return priceString; // Return original if parsing fails
    }

    // Format to 2 decimal places. toFixed() returns a string.
    const formattedAmount = amount.toFixed(2); // e.g., "84.90" or "69.90"

    // Replace the dot with a comma for German locale.
    const finalAmount = formattedAmount.replace('.', ',');

    return `${finalAmount} ${currencyCode}`;
  };

  return (
    <View className={` ${className} `}>
      <View className="bg-white rounded-lg shadow-sm">
        <TouchableOpacity onPress={onPress}>
          <View className="relative">
            {/* The high-fidelity image is the hero of the card */}
            <Image
              source={{ uri: product.imageUrl }}
              className="w-full aspect-square rounded-t-lg bg-gray-100"
              resizeMode="cover"
            />

            {/*<TouchableOpacity onPress={handleAddToCart}*/}
            {/*                  className="absolute bottom-3 right-3 bg-primary backdrop-blur-sm rounded-full p-2"*/}
            {/*>*/}
            {/*  <Icon*/}
            {/*    name="cart"*/}
            {/*    size={22}*/}
            {/*    color="#fff"*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity onPress={handleAddToCart}
                              className="absolute bottom-3 right-3 bg-primary backdrop-blur-sm rounded-full p-2"
            >
              <Icon
                name="plus"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Product info is cleanly organized with generous padding */}
        <View className="p-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              {/* Using a serif font for an elegant, editorial feel */}
              <Text
                className="text-text text-base"
                numberOfLines={1} // Ensures the text is limited to one line
                ellipsizeMode="tail" // Adds "..." if the text overflows
              >
                {product.name}
              </Text>
              <View className={"flex-row justify-between items-center"}>
                <Text className="text-text text-base font-semibold mt-1">
                  {formatPriceForGermanLocale(product.price)}
                </Text>
                <TouchableOpacity
                  onPress={handleWishlistPress}
                  className=" backdrop-blur-sm rounded-full p-2"
                >
                  <Icon
                    name="heart"
                    size={22}
                    color="#334155" // using our new text-text color
                    fill={isFavorited ? '#334155' : 'none'}
                  />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
