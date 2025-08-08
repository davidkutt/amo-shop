import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { ProductCard } from 'components/organisms/ProductCard';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.6;

const RecentlyViewedContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface RecentlyViewedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isWishlisted: boolean;
  onPress: () => void;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
}

export interface RecentlyViewedProps {
  title: string;
  subtitle?: string;
  products: RecentlyViewedProduct[];
  showViewAll?: boolean;
  onViewAll?: () => void;
  maxItems?: number;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  title,
  subtitle,
  products,
  showViewAll = true,
  onViewAll,
  maxItems = 10,
}) => {
  const displayProducts = products.slice(0, maxItems);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <RecentlyViewedContainer paddingVertical="lg">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Text variant="subtitle" color="textPrimary" marginBottom="xs">
            {title}
          </Text>
          {subtitle && (
            <Text variant="body" color="textSecondary">
              {subtitle}
            </Text>
          )}
        </View>
        {showViewAll && onViewAll && (
          <Button
            variant="text"
            size="sm"
            title="View All"
            onPress={onViewAll}
          />
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {displayProducts.map((product) => (
          <View
            key={product.id}
            style={{
              width: cardWidth,
              marginRight: 16,
            }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              reviewCount={product.reviewCount}
              isWishlisted={product.isWishlisted}
              onPress={product.onPress}
              onWishlistToggle={product.onWishlistToggle}
              onAddToCart={product.onAddToCart}
            />
          </View>
        ))}
      </ScrollView>

      {products.length > maxItems && (
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text variant="small" color="textSecondary">
            Showing {maxItems} of {products.length} recently viewed items
          </Text>
        </View>
      )}
    </RecentlyViewedContainer>
  );
};

export default RecentlyViewed;
export type { RecentlyViewedProps };
