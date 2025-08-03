import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { ProductCard } from 'components/organisms/ProductCard';

// Define the shape of the props this component accepts
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

interface HorizontalProductCarouselProps {
  title: string;
  products: Product[];
}

/**
 * A horizontally scrolling carousel to display a list of products.
 */
export const HorizontalProductCarousel: React.FC<HorizontalProductCarouselProps> = ({
                                                                                      title,
                                                                                      products,
                                                                                    }) => {
  const navigation = useNavigation();

  const handleProductPress = (product: Product) => {
    navigation.navigate('Search', {
      screen: 'ProductDetail',
      params: { productId: product.id },
    });
  };

  return (
    // The main container provides vertical spacing and a clean background
    <View className="py-8 bg-background">
      {/* The section title uses our elegant serif font */}
      <View className="px-4 mb-4">
        <Text
          variant="h3"
          className="text-text text-2xl"
        >
          {title}
        </Text>
      </View>

      {/* The FlatList is configured for horizontal scrolling */}
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
            className={"w-[200px] mx-2"}
          />
        )}
        // Add padding to the start and end of the list for better spacing
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
};
