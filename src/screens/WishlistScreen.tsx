import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { Header } from 'components/organisms/Header';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { NavigationProps } from 'navigation/types';
import { useWishlist } from 'hooks/useWishlist';
import { useCart } from 'hooks/useCart';

const Box = createBox<Theme>();

const WishlistScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // State management
  const { 
    items: wishlistItems, 
    loading: wishlistLoading, 
    error: wishlistError,
    loadWishlist,
    removeFromWishlist,
    isEmpty 
  } = useWishlist();
  
  const { 
    itemCount: cartItemCount,
    addItem: addToCart,
    isInCart 
  } = useCart();

  // Load wishlist on component mount
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleWishlistToggle = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert('Fehler', 'Produkt konnte nicht aus der Merkliste entfernt werden.');
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const product = wishlistItems.find(p => p.id === productId);
      if (product) {
        await addToCart({
          product,
          quantity: 1,
        });
        Alert.alert('Erfolg', 'Produkt wurde zum Warenkorb hinzugefügt!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Fehler', 'Produkt konnte nicht zum Warenkorb hinzugefügt werden.');
    }
  };

  // Helper function to convert our Product type to component's expected type
  const mapProductForCarousel = (product: any) => ({
    id: product.id,
    handle: product.handle,
    variantId: product.variantId,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    rating: product.rating || 4.5,
    reviewCount: product.reviewCount || 0,
  });

  if (wishlistLoading) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#93c5fd" />
        <Text variant="body" marginTop="m" color="textSecondary">
          Merkliste wird geladen...
        </Text>
      </Box>
    );
  }

  if (wishlistError) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center" paddingHorizontal="l">
        <Icon name="alert" size={64} color="#ef4444" />
        <Text variant="title" marginTop="l" marginBottom="s" textAlign="center">
          Fehler beim Laden
        </Text>
        <Text variant="body" color="textSecondary" textAlign="center" marginBottom="xl">
          {wishlistError}
        </Text>
        <Button
          variant="primary"
          title="Erneut versuchen"
          onPress={loadWishlist}
        />
      </Box>
    );
  }

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title="Merkliste"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={cartItemCount}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Meine Wunschliste
          </Text>
          {!isEmpty ? (
            <HorizontalProductCarousel
              title="Gespeicherte Produkte"
              products={wishlistItems.map(mapProductForCarousel)}
              onProductPress={handleProductPress}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
              wishlistedProducts={wishlistItems.map(p => p.id)}
              cartProducts={wishlistItems.filter(p => isInCart(p.id)).map(p => p.id)}
            />
          ) : (
            <Box alignItems="center" paddingVertical="xxl">
              <Icon name="heart" size={64} color="#d1d5db" />
              <Text variant="title" marginTop="l" marginBottom="s" textAlign="center">
                Deine Merkliste ist leer
              </Text>
              <Text variant="body" color="textSecondary" textAlign="center" marginBottom="xl">
                Entdecke tolle Produkte und füge sie zu deiner Merkliste hinzu!
              </Text>
              <Button
                variant="primary"
                title="Produkte entdecken"
                onPress={() => navigation.navigate('Home')}
              />
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default WishlistScreen;
