import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { ProductCard } from 'components/organisms/ProductCard';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.4;

const ShopTheLookContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface LookProduct {
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

export interface ShopTheLookProps {
  title: string;
  subtitle?: string;
  description?: string;
  lookImage: string;
  products: LookProduct[];
  totalPrice: number;
  onAddAllToCart: () => void;
  onViewLook: () => void;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const ShopTheLook: React.FC<ShopTheLookProps> = ({
  title,
  subtitle,
  description,
  lookImage,
  products,
  totalPrice,
  onAddAllToCart,
  onViewLook,
  showViewAll = true,
  onViewAll,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <ShopTheLookContainer paddingVertical="lg">
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

      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: '#f0f0f0', // Placeholder for look image
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Icon name="image" size={48} color="textSecondary" />
          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text variant="small" color="white">
              {products.length} items
            </Text>
          </View>
        </View>

        <View style={{ padding: 16 }}>
          {description && (
            <Text variant="body" color="textSecondary" marginBottom="md">
              {description}
            </Text>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text variant="subtitle" color="textPrimary">
                Total: {formatPrice(totalPrice)}
              </Text>
              <Text variant="small" color="textSecondary">
                Save {formatPrice(products.reduce((sum, p) => sum + (p.originalPrice || p.price) - p.price, 0))}
              </Text>
            </View>
            <Button
              variant="primary"
              size="md"
              title="Add All to Cart"
              onPress={onAddAllToCart}
            />
          </View>

          <Button
            variant="outline"
            size="sm"
            title="View Complete Look"
            onPress={onViewLook}
            style={{ width: '100%' }}
          />
        </View>
      </View>

      <Text variant="subtitle" color="textPrimary" marginBottom="md">
        Products in this look
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {products.map((product) => (
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
    </ShopTheLookContainer>
  );
};

export default ShopTheLook;
export type { ShopTheLookProps };
