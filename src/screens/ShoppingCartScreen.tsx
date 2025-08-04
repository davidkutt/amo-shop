import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { useCart } from 'context/CartContext.tsx';
import { useNavigation } from '@react-navigation/native';

// This is a new, single-purpose component for this screen
const CartItem = ({ item }) => (
  <View className="flex-row items-center p-4 border-b-2 border-text/20 bg-background">
    <View className="w-24 h-24 border-2 border-text/20 bg-gray-100">
      <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
    </View>
    <View className="flex-1 ml-4">
      <Text variant="body" className="font-semibold">{item.name}</Text>
      <Text variant="small" className="my-1">Größe: M</Text>
      <Text variant="body" className="font-semibold">{item.price}</Text>
    </View>
    <View className="items-center">
      <Text variant="body" className="font-semibold">{item.quantity}</Text>
      <TouchableOpacity onPress={() => {}} className="mt-2 p-1">
        <Icon name="close" size={20} color="#334155" />
      </TouchableOpacity>
    </View>
  </View>
);

/**
 * The Shopping Cart screen with dynamic totals.
 */
const ShoppingCartScreen = () => {
  const { items, removeItem } = useCart();
  const navigation = useNavigation();

  // --- DYNAMIC TOTALS CALCULATION ---
  const { subtotal, total } = useMemo(() => {
    const calculatedSubtotal = items.reduce((acc, item) => {
      // Clean the price string (remove '€', spaces) and convert to a number
      const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      if (!isNaN(priceNumber)) {
        return acc + priceNumber * item.quantity;
      }
      return acc;
    }, 0);

    // For now, shipping is free, so total is the same as subtotal
    const calculatedTotal = calculatedSubtotal;

    return {
      subtotal: calculatedSubtotal.toFixed(2),
      total: calculatedTotal.toFixed(2),
    };
  }, [items]); // This calculation re-runs only when the items array changes

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* For now, we'll use a simple text header. This could be our Header component */}
      <View className="flex-row items-center justify-between p-4 border-b-2 border-text/20 bg-background">
        <Text variant="title" className="text-center flex-1">
          Warenkorb
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#334155" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* --- List of Items --- */}
        <View>
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <View className="text-center p-8">
              <Text variant="body" className="text-text/70">Dein Warenkorb ist leer.</Text>
            </View>
          )}
        </View>

        {/* --- Order Summary with dynamic values --- */}
        {items.length > 0 && (
          <View className="p-4 mt-4">
            <View className="flex-row justify-between items-center p-4 border-b border-text/20">
              <Text variant="body">PREIS</Text>
              <Text variant="body" className="font-semibold">{subtotal} €</Text>
            </View>
            <View className="flex-row justify-between items-center p-4 border-b border-text/20">
              <Text variant="body">Versand</Text>
              <Text variant="body" className="font-semibold">KOSTENLOS</Text>
            </View>
            <View className="flex-row justify-between items-center p-4">
              <Text variant="subtitle">Gesamt</Text>
              <Text variant="subtitle">{total} €</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* --- Checkout CTA --- */}
      {items.length > 0 && (
        <View className="p-4 border-t-2 border-black">
          {/* --- THIS IS THE CHANGE --- */}
          <Button
            title="Weiter zum Checkout"
            onPress={() => navigation.navigate('CheckoutScreen')}
            className="bg-black border-black w-full"
            textClassName="text-white"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ShoppingCartScreen;
