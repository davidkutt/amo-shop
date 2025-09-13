import React, { useState, useEffect } from 'react';
import { ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Input } from 'components/atoms/Input';
import { Icon } from 'components/atoms/Icon';
import PersonalizationPreview from 'components/molecules/PersonalizationPreview';
import { Header } from 'components/organisms/Header';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { NavigationProps } from 'navigation/types';
import { Product, ProductCategory } from 'services/types';
import { ShopifyService } from 'services/shopifyService';
import { RecentlyViewedService, WishlistService, CartService, CartItem } from 'services/storageService';

const Box = createBox<Theme>();

interface PersonalizationData {
  petName?: string;
  phoneNumber?: string;
}

const ProductDetailScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { productId } = route.params as { productId: string };
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [personalization, setPersonalization] = useState<PersonalizationData>({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
    loadCartCount();
  }, [productId]);

  useEffect(() => {
    if (product) {
      checkWishlistStatus();
      loadRelatedProducts();
      // Add to recently viewed
      RecentlyViewedService.addProduct(product);
    }
  }, [product]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productData = await ShopifyService.getProductByHandle(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Fehler', 'Produkt konnte nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    if (!product?.designCollectionHandle) return;
    
    try {
      const collection = await ShopifyService.getCollectionByHandle(product.designCollectionHandle);
      if (collection) {
        // Filter out current product
        const related = collection.products.filter(p => p.id !== product.id);
        setRelatedProducts(related.slice(0, 6)); // Show max 6 related products
      }
    } catch (error) {
      console.error('Error loading related products:', error);
    }
  };

  const loadCartCount = async () => {
    try {
      const count = await CartService.getCartItemCount();
      setCartItemCount(count);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  const checkWishlistStatus = async () => {
    if (!product) return;
    
    try {
      const inWishlist = await WishlistService.isInWishlist(product.id);
      setIsInWishlist(inWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleWishlistToggle = async () => {
    if (!product) return;
    
    try {
      if (isInWishlist) {
        await WishlistService.removeFromWishlist(product.id);
        setIsInWishlist(false);
      } else {
        await WishlistService.addToWishlist(product);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      Alert.alert('Fehler', 'Wunschliste konnte nicht aktualisiert werden.');
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Validate personalization based on product type
    if (!validatePersonalization()) {
      return;
    }
    
    try {
      const cartItem: CartItem = {
        product,
        quantity,
        personalization: Object.keys(personalization).length > 0 ? personalization : undefined,
      };
      
      await CartService.addToCart(cartItem);
      await loadCartCount();
      
      Alert.alert(
        'Erfolg',
        'Produkt wurde zum Warenkorb hinzugefügt!',
        [
          { text: 'Weiter einkaufen', style: 'cancel' },
          { text: 'Zum Warenkorb', onPress: () => navigation.navigate('Cart') }
        ]
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Fehler', 'Produkt konnte nicht zum Warenkorb hinzugefügt werden.');
    }
  };

  const validatePersonalization = (): boolean => {
    if (!product) return true;
    
    const productType = product.productType as ProductCategory;
    
    // Check required fields based on product type
    if (['tag', 'collar', 'bowl'].includes(productType)) {
      if (!personalization.petName || personalization.petName.trim().length === 0) {
        Alert.alert('Personalisierung erforderlich', 'Bitte geben Sie den Namen Ihres Haustieres ein.');
        return false;
      }
      
      if (personalization.petName && personalization.petName.length > 200) {
        Alert.alert('Zu viele Zeichen', 'Der Name darf maximal 200 Zeichen lang sein.');
        return false;
      }
    }
    
    if (productType === 'tag' && personalization.phoneNumber) {
      if (personalization.phoneNumber.length > 200) {
        Alert.alert('Zu viele Zeichen', 'Die Telefonnummer darf maximal 200 Zeichen lang sein.');
        return false;
      }
    }
    
    return true;
  };

  const getPersonalizationFields = () => {
    if (!product) return null;
    
    const productType = product.productType as ProductCategory;
    const fields = [];
    
    if (['tag', 'collar', 'bowl'].includes(productType)) {
      fields.push(
        <Box key="petName" marginBottom="m">
          <Text variant="subtitle" marginBottom="s">
            Name des Haustieres *
          </Text>
          <Input
            placeholder="z.B. Max"
            value={personalization.petName || ''}
            onChangeText={(text) => setPersonalization(prev => ({ ...prev, petName: text }))}
            maxLength={200}
          />
          <Text variant="small" color="textSecondary" marginTop="xs">
            {personalization.petName?.length || 0}/200 Zeichen
          </Text>
          <PersonalizationPreview
            personalization={personalization}
            productType={productType}
            visible={!!personalization.petName}
          />
        </Box>
      );
    }
    
    if (productType === 'tag') {
      fields.push(
        <Box key="phoneNumber" marginBottom="m">
          <Text variant="subtitle" marginBottom="s">
            Telefonnummer (optional)
          </Text>
          <Input
            placeholder="z.B. +49 123 456789"
            value={personalization.phoneNumber || ''}
            onChangeText={(text) => setPersonalization(prev => ({ ...prev, phoneNumber: text }))}
            maxLength={200}
            keyboardType="phone-pad"
          />
          <Text variant="small" color="textSecondary" marginTop="xs">
            {personalization.phoneNumber?.length || 0}/200 Zeichen
          </Text>
          <PersonalizationPreview
            personalization={personalization}
            productType={productType}
            visible={!!personalization.phoneNumber}
          />
        </Box>
      );
    }
    
    return fields.length > 0 ? (
      <Box marginBottom="xl">
        <Text variant="title" marginBottom="l">
          Personalisierung
        </Text>
        {fields}
      </Box>
    ) : null;
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { productId: product.handle });
  };

  const handleWishlistToggleProduct = async (productId: string) => {
    try {
      const inWishlist = await WishlistService.isInWishlist(productId);
      if (inWishlist) {
        await WishlistService.removeFromWishlist(productId);
      } else {
        const productToAdd = relatedProducts.find(p => p.id === productId);
        if (productToAdd) {
          await WishlistService.addToWishlist(productToAdd);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist for product:', error);
    }
  };

  const handleAddToCartProduct = async (productId: string) => {
    try {
      const productToAdd = relatedProducts.find(p => p.id === productId);
      if (productToAdd) {
        const cartItem: CartItem = {
          product: productToAdd,
          quantity: 1,
        };
        
        await CartService.addToCart(cartItem);
        await loadCartCount();
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (loading) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#93c5fd" />
        <Text variant="body" marginTop="m" color="textSecondary">
          Produkt wird geladen...
        </Text>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box backgroundColor="background" flex={1}>
        <Header
          back
          title="Produktdetails"
          onBackPress={handleBackPress}
          onCartPress={handleCartPress}
          cartItemCount={cartItemCount}
        />
        <Box flex={1} justifyContent="center" alignItems="center" paddingHorizontal="l">
          <Icon name="error" size={48} color="#ef4444" />
          <Text variant="title" marginTop="m" marginBottom="s" textAlign="center">
            Produkt nicht gefunden
          </Text>
          <Text variant="body" color="textSecondary" textAlign="center">
            Das angeforderte Produkt konnte nicht geladen werden.
          </Text>
          <Button
            variant="primary"
            title="Zurück"
            onPress={handleBackPress}
            marginTop="l"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title={product.name}
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={cartItemCount}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Box height={300} backgroundColor="cardBackground" marginBottom="l">
          <Image
            source={{ uri: product.imageUrl }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </Box>

        <Box paddingHorizontal="l">
          {/* Product Info */}
          <Box marginBottom="l">
            <Text variant="title" marginBottom="s">
              {product.name}
            </Text>
            <Text variant="subtitle" color="primary" marginBottom="m">
              {product.price}
            </Text>
            {product.description && (
              <Text variant="body" color="textSecondary" marginBottom="m">
                {product.description}
              </Text>
            )}
            <Box flexDirection="row" alignItems="center" marginBottom="m">
              <Text variant="small" color="textSecondary" marginRight="s">
                Verfügbar:
              </Text>
              <Text variant="small" color={product.available ? 'success' : 'error'}>
                {product.available ? 'Auf Lager' : 'Nicht verfügbar'}
              </Text>
            </Box>
          </Box>

          {/* Personalization Fields */}
          {getPersonalizationFields()}

          {/* Quantity Selector */}
          <Box marginBottom="l">
            <Text variant="subtitle" marginBottom="s">
              Anzahl
            </Text>
            <Box flexDirection="row" alignItems="center">
              <Button
                variant="outline"
                title="-"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                width={50}
                height={50}
                marginRight="s"
              />
              <Text variant="body" marginHorizontal="m">
                {quantity}
              </Text>
              <Button
                variant="outline"
                title="+"
                onPress={() => setQuantity(quantity + 1)}
                width={50}
                height={50}
                marginLeft="s"
              />
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box flexDirection="row" marginBottom="xl">
            <Button
              variant="outline"
              title=""
              onPress={handleWishlistToggle}
              width={60}
              height={60}
              marginRight="s"
              borderRadius="full"
            >
              <Icon 
                name="heart" 
                size={24} 
                color={isInWishlist ? "#ef4444" : "#6b7280"} 
              />
            </Button>
            <Button
              variant="primary"
              title="Zum Warenkorb"
              onPress={handleAddToCart}
              flex={1}
              height={60}
              disabled={!product.available}
            />
          </Box>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <Box marginBottom="xl">
              <HorizontalProductCarousel
                title="Complete the Set"
                products={relatedProducts}
                onProductPress={handleProductPress}
                onWishlistToggle={handleWishlistToggleProduct}
                onAddToCart={handleAddToCartProduct}
              />
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ProductDetailScreen;
