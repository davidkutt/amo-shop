import React, { useEffect } from 'react';
import { ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';
import { useCart } from 'hooks/useCart';

const Box = createBox<Theme>();

const CartScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const {
    items: cartItems,
    total: cartTotal,
    itemCount,
    loading,
    error,
    updateQuantity,
    removeItem,
    loadCart,
    getTotalWithShipping,
    getShippingCost,
  } = useCart();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Fehler', 'Menge konnte nicht aktualisiert werden.');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    Alert.alert(
      'Artikel entfernen',
      'Möchten Sie diesen Artikel aus dem Warenkorb entfernen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Entfernen',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeItem(productId);
            } catch (error) {
              console.error('Error removing item:', error);
              Alert.alert('Fehler', 'Artikel konnte nicht entfernt werden.');
            }
          }
        }
      ]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Warenkorb leer', 'Fügen Sie Artikel zum Warenkorb hinzu, um fortzufahren.');
      return;
    }
    
    navigation.navigate('Checkout');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const formatPrice = (price: number): string => {
    return `${price.toFixed(2).replace('.', ',')} €`;
  };

  const renderPersonalization = (personalization?: { petName?: string; phoneNumber?: string }) => {
    if (!personalization || Object.keys(personalization).length === 0) {
      return null;
    }

    return (
      <Box marginTop="s" padding="s" backgroundColor="cardBackground" borderRadius="m">
        <Text variant="small" color="textSecondary" marginBottom="xs">
          Personalisierung:
        </Text>
        {personalization.petName && (
          <Text variant="small" marginBottom="xs">
            Name: {personalization.petName}
          </Text>
        )}
        {personalization.phoneNumber && (
          <Text variant="small">
            Telefon: {personalization.phoneNumber}
          </Text>
        )}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#93c5fd" />
        <Text variant="body" marginTop="m" color="textSecondary">
          Warenkorb wird geladen...
        </Text>
      </Box>
    );
  }

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title="Warenkorb"
        onBackPress={handleBackPress}
        cartItemCount={itemCount}
      />
      
      {cartItems.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center" paddingHorizontal="l">
          <Icon name="cart" size={64} color="#d1d5db" />
          <Text variant="title" marginTop="l" marginBottom="s" textAlign="center">
            Ihr Warenkorb ist leer
          </Text>
          <Text variant="body" color="textSecondary" textAlign="center" marginBottom="xl">
            Entdecken Sie unsere Produkte und fügen Sie Artikel zu Ihrem Warenkorb hinzu.
          </Text>
          <Button
            variant="primary"
            title="Produkte entdecken"
            onPress={() => navigation.navigate('Home')}
          />
        </Box>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <Box paddingHorizontal="l" paddingVertical="l">
              {cartItems.map((item) => (
                <Box
                  key={item.product.id}
                  backgroundColor="cardBackground"
                  borderRadius="l"
                  padding="l"
                  marginBottom="m"
                  shadowColor="black"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={4}
                  elevation={3}
                >
                  <Box flexDirection="row" marginBottom="m">
                    {/* Product Image */}
                    <Box
                      width={80}
                      height={80}
                      backgroundColor="background"
                      borderRadius="m"
                      marginRight="m"
                      overflow="hidden"
                    >
                      <Image
                        source={{ uri: item.product.imageUrl }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </Box>

                    {/* Product Info */}
                    <Box flex={1}>
                      <Text variant="subtitle" marginBottom="xs" numberOfLines={2}>
                        {item.product.name}
                      </Text>
                      <Text variant="body" color="primary" marginBottom="s">
                        {item.product.price}
                      </Text>
                      
                      {/* Personalization Display */}
                      {renderPersonalization(item.personalization)}
                    </Box>
                  </Box>

                  {/* Quantity Controls */}
                  <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box flexDirection="row" alignItems="center">
                      <Button
                        variant="outline"
                        title="-"
                        onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        width={40}
                        height={40}
                        marginRight="s"
                      />
                      <Text variant="body" marginHorizontal="m" minWidth={30} textAlign="center">
                        {item.quantity}
                      </Text>
                      <Button
                        variant="outline"
                        title="+"
                        onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        width={40}
                        height={40}
                        marginLeft="s"
                      />
                    </Box>

                    <Button
                      variant="outline"
                      title=""
                      onPress={() => handleRemoveItem(item.product.id)}
                      width={40}
                      height={40}
                      borderRadius="full"
                    >
                      <Icon name="delete" size={20} color="#ef4444" />
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </ScrollView>

          {/* Cart Summary */}
          <Box
            backgroundColor="cardBackground"
            paddingHorizontal="l"
            paddingVertical="l"
            borderTopWidth={1}
            borderTopColor="border"
          >
            <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
              <Text variant="subtitle">
                Zwischensumme:
              </Text>
              <Text variant="subtitle">
                {formatPrice(cartTotal)}
              </Text>
            </Box>
            
            <Box flexDirection="row" justifyContent="space-between" marginBottom="l">
              <Text variant="body">
                Versand:
              </Text>
              <Text variant="body">
                {getShippingCost() === 0 ? 'Kostenlos' : `${formatPrice(getShippingCost())}`}
              </Text>
            </Box>

            <Box flexDirection="row" justifyContent="space-between" marginBottom="l" paddingTop="m" borderTopWidth={1} borderTopColor="border">
              <Text variant="title">
                Gesamt:
              </Text>
              <Text variant="title" color="primary">
                {formatPrice(getTotalWithShipping())}
              </Text>
            </Box>

            <Button
              variant="primary"
              title="Zur Kasse"
              onPress={handleCheckout}
              height={60}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartScreen;
