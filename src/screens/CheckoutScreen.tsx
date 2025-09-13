import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator, Linking } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';
import { useCart } from 'hooks/useCart';
import { ShopifyService } from 'services/shopifyService';

const Box = createBox<Theme>();

const CheckoutScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { 
    items: cartItems, 
    total: cartTotal, 
    itemCount,
    loading: cartLoading,
    clearCart,
    getTotalWithShipping,
    getShippingCost,
  } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to cart if empty
    if (!cartLoading && cartItems.length === 0) {
      Alert.alert(
        'Warenkorb leer',
        'Ihr Warenkorb ist leer. Fügen Sie Artikel hinzu, um fortzufahren.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Cart'),
          },
        ]
      );
    }
  }, [cartItems, cartLoading, navigation]);

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Warenkorb leer', 'Fügen Sie Artikel zum Warenkorb hinzu, um fortzufahren.');
      return;
    }

    try {
      setCheckoutLoading(true);

      // Create checkout with Shopify
      const checkoutResponse = await ShopifyService.createCheckoutFromCart(cartItems);

      if (checkoutResponse.checkoutUserErrors.length > 0) {
        const errors = checkoutResponse.checkoutUserErrors.map(error => error.message).join('\n');
        Alert.alert('Checkout Fehler', errors);
        return;
      }

      if (checkoutResponse.checkout?.webUrl) {
        setCheckoutUrl(checkoutResponse.checkout.webUrl);
        
        // Open checkout in browser
        const supported = await Linking.canOpenURL(checkoutResponse.checkout.webUrl);
        if (supported) {
          await Linking.openURL(checkoutResponse.checkout.webUrl);
        } else {
          Alert.alert('Fehler', 'Browser konnte nicht geöffnet werden.');
        }
      } else {
        Alert.alert('Fehler', 'Checkout konnte nicht erstellt werden.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert(
        'Checkout Fehler',
        'Es gab ein Problem beim Erstellen des Checkouts. Bitte versuchen Sie es erneut.'
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    return `${price.toFixed(2).replace('.', ',')} €`;
  };

  if (cartLoading) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#93c5fd" />
        <Text variant="body" marginTop="m" color="textSecondary">
          Warenkorb wird geladen...
        </Text>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center" paddingHorizontal="l">
        <Icon name="cart" size={64} color="#d1d5db" />
        <Text variant="title" marginTop="l" marginBottom="s" textAlign="center">
          Warenkorb ist leer
        </Text>
        <Text variant="body" color="textSecondary" textAlign="center" marginBottom="xl">
          Fügen Sie Artikel zu Ihrem Warenkorb hinzu, um fortzufahren.
        </Text>
        <Button
          variant="primary"
          title="Produkte entdecken"
          onPress={() => navigation.navigate('Home')}
        />
      </Box>
    );
  }

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title="Checkout"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={itemCount}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="l">
            Bestellung abschließen
          </Text>

          {/* Order Summary */}
          <Box 
            backgroundColor="cardBackground" 
            borderRadius="l" 
            padding="l" 
            marginBottom="l"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={4}
            elevation={3}
          >
            <Text variant="subtitle" marginBottom="m">
              Bestellübersicht
            </Text>
            
            <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
              <Text variant="body">Artikel ({itemCount}):</Text>
              <Text variant="body">{formatPrice(cartTotal)}</Text>
            </Box>
            
            <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
              <Text variant="body">Versand:</Text>
              <Text variant="body">
                {getShippingCost() === 0 ? 'Kostenlos' : formatPrice(getShippingCost())}
              </Text>
            </Box>
            
            <Box 
              flexDirection="row" 
              justifyContent="space-between" 
              marginTop="m" 
              paddingTop="m" 
              borderTopWidth={1} 
              borderTopColor="border"
            >
              <Text variant="subtitle">Gesamt:</Text>
              <Text variant="subtitle" color="primary">
                {formatPrice(getTotalWithShipping())}
              </Text>
            </Box>
          </Box>

          {/* Checkout Information */}
          <Box 
            backgroundColor="cardBackground" 
            borderRadius="l" 
            padding="l" 
            marginBottom="l"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={4}
            elevation={3}
          >
            <Text variant="subtitle" marginBottom="m">
              Checkout Information
            </Text>
            
            <Text variant="body" color="textSecondary" marginBottom="s">
              • Sie werden zu Shopify's sicherem Checkout weitergeleitet
            </Text>
            <Text variant="body" color="textSecondary" marginBottom="s">
              • Gast-Checkout ist möglich (kein Konto erforderlich)
            </Text>
            <Text variant="body" color="textSecondary" marginBottom="s">
              • Personalisierte Artikel werden automatisch übertragen
            </Text>
            <Text variant="body" color="textSecondary">
              • Sichere Zahlung mit SSL-Verschlüsselung
            </Text>
          </Box>

          {/* Personalization Notice */}
          {cartItems.some(item => item.personalization && Object.keys(item.personalization).length > 0) && (
            <Box 
              backgroundColor="accent1" 
              borderRadius="l" 
              padding="l" 
              marginBottom="l"
            >
              <Text variant="subtitle" marginBottom="s" color="text">
                Personalisierte Artikel
              </Text>
              <Text variant="body" color="text">
                Ihre personalisierten Artikel werden automatisch mit den eingegebenen Daten 
                (Name, Telefonnummer) an Shopify übertragen.
              </Text>
            </Box>
          )}

          {/* Checkout Button */}
          <Button
            variant="primary"
            title={checkoutLoading ? "Checkout wird erstellt..." : "Zur Kasse"}
            onPress={handleProceedToCheckout}
            disabled={checkoutLoading}
            height={60}
            marginBottom="l"
          />

          {checkoutLoading && (
            <Box alignItems="center" marginTop="m">
              <ActivityIndicator size="small" color="#93c5fd" />
              <Text variant="small" color="textSecondary" marginTop="s">
                Checkout wird erstellt...
              </Text>
            </Box>
          )}

          {checkoutUrl && (
            <Box 
              backgroundColor="success" 
              borderRadius="l" 
              padding="l" 
              marginTop="m"
            >
              <Text variant="body" color="white" textAlign="center">
                Checkout erfolgreich erstellt! Sie wurden zum sicheren Checkout weitergeleitet.
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CheckoutScreen;
