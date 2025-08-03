import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { ProductCard } from 'components/organisms/ProductCard';

// Reusing the Product interface
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

interface RecentlyViewedProps {
  title: string;
  products: Product[];
}

/**
 * A horizontally scrolling carousel to display recently viewed products.
 */
export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
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
    <View className="py-8 bg-background">
      {/* Section title */}
      <View className="px-4 mb-4">
        <Text
          className="text-text text-2xl"
        >
          {title}
        </Text>
      </View>

      {/* Horizontal list of recently viewed products */}
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
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
};
