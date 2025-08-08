import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { NavigationProps } from 'navigation/types';

const WishlistContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const WishlistScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Mock wishlist data
  const wishlistProducts = [
    {
      id: '1',
      name: 'Personalized Pet Collar',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.5,
      reviewCount: 128,
      isWishlisted: true,
      onPress: () => handleProductPress('1'),
      onWishlistToggle: () => {},
      onAddToCart: () => {},
    },
    {
      id: '2',
      name: 'Custom Pet Bowl',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.8,
      reviewCount: 95,
      isWishlisted: true,
      onPress: () => handleProductPress('2'),
      onWishlistToggle: () => {},
      onAddToCart: () => {},
    },
  ];

  return (
    <WishlistContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Merkliste"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Meine Wunschliste
          </Text>
          {wishlistProducts.length > 0 ? (
            <HorizontalProductCarousel
              title="Gespeicherte Produkte"
              products={wishlistProducts}
              onViewAll={() => {}}
            />
          ) : (
            <View alignItems="center" paddingVertical="xxl">
              <Text variant="body" color="textSecondary" textAlign="center">
                Deine Merkliste ist noch leer.{'\n'}
                Entdecke tolle Produkte und füge sie hinzu!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </WishlistContainer>
  );
};

export default WishlistScreen;
