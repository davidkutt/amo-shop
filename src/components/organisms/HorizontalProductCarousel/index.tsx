import React from 'react';
import { View, FlatList } from 'react-native';
import {
  createRestyleComponent,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { ProductCard } from 'components/organisms/ProductCard';

type Product = {
  id: string;
  handle: string;
  variantId: string;
  name: string;
  price: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
};

type HorizontalProductCarouselProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    title: string;
    products: Product[];
    onProductPress?: (product: Product) => void;
    onWishlistToggle?: (productId: string) => void;
    onAddToCart?: (productId: string) => void;
    wishlistedProducts?: string[];
    cartProducts?: string[];
  };

const HorizontalProductCarouselBase = createRestyleComponent<HorizontalProductCarouselProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const HorizontalProductCarousel: React.FC<HorizontalProductCarouselProps> = ({
  title,
  products,
  onProductPress,
  onWishlistToggle,
  onAddToCart,
  wishlistedProducts = [],
  cartProducts = [],
  ...rest
}) => {
  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => onProductPress?.(item)}
      onWishlistToggle={() => onWishlistToggle?.(item.id)}
      onAddToCart={() => onAddToCart?.(item.id)}
      isWishlisted={wishlistedProducts.includes(item.id)}
      isInCart={cartProducts.includes(item.id)}
    />
  );

  const keyExtractor = (item: Product) => item.id;

  return (
    <HorizontalProductCarouselBase
      marginBottom="l"
      {...rest}
    >
      {/* Section Title */}
      <Text
        variant="subtitle"
        marginBottom="m"
        marginHorizontal="l"
      >
        {title}
      </Text>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        ItemSeparatorComponent={() => <View width={8} />}
      />
    </HorizontalProductCarouselBase>
  );
};

export default HorizontalProductCarousel;
