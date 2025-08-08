import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

type Product = {
  id: string;
  handle: string;
  variantId: string;
  name: string;
  price: string; // e.g., "84.90 EUR"
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
};

type ProductCardProps = VariantProps<Theme, 'cardVariants'> &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    product: Product;
    onPress: () => void;
    onWishlistToggle?: () => void;
    onAddToCart?: () => void;
    isWishlisted?: boolean;
    isInCart?: boolean;
  };

const ProductCardBase = createRestyleComponent<ProductCardProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
  createVariant({ themeKey: 'cardVariants' }),
]);

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onWishlistToggle,
  onAddToCart,
  isWishlisted = false,
  isInCart = false,
  variant = 'elevated',
  ...rest
}) => {
  const formatPrice = (price: string) => {
    // Convert "84.90 EUR" to "84,90 €" (German format)
    const [amount, currency] = price.split(' ');
    return `${amount.replace('.', ',')} €`;
  };

  return (
    <ProductCardBase
      variant={variant}
      onPress={onPress}
      width={200}
      marginRight="m"
      {...rest}
    >
      {/* Image Container */}
      <View position="relative" marginBottom="m">
        <Image
          source={{ uri: product.imageUrl }}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 12,
          }}
          resizeMode="cover"
        />
        
        {/* Wishlist Button */}
        {onWishlistToggle && (
          <TouchableOpacity
            onPress={onWishlistToggle}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'white',
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Icon
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={20}
              color={isWishlisted ? 'accent2' : 'textSecondary'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Product Info */}
      <View flex={1}>
        <Text
          variant="body"
          fontWeight="600"
          marginBottom="xs"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        {/* Price */}
        <Text variant="subtitle" color="primary" marginBottom="s">
          {formatPrice(product.price)}
        </Text>

        {/* Rating */}
        {product.rating && (
          <View flexDirection="row" alignItems="center" marginBottom="s">
            <Icon name="star" size={16} color="accent1" marginRight="xs" />
            <Text variant="small" color="textSecondary">
              {product.rating.toFixed(1)}
            </Text>
            {product.reviewCount && (
              <Text variant="small" color="textTertiary" marginLeft="xs">
                ({product.reviewCount})
              </Text>
            )}
          </View>
        )}

        {/* Add to Cart Button */}
        {onAddToCart && (
          <TouchableOpacity
            onPress={onAddToCart}
            style={{
              backgroundColor: isInCart ? 'gray' : '#93c5fd',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <Text
              variant="small"
              color="white"
              fontWeight="600"
            >
              {isInCart ? 'Im Warenkorb' : 'Zum Warenkorb'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ProductCardBase>
  );
};

export default ProductCard;
