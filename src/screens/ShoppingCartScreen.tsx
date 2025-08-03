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
  <View className="flex-row items-center p-4 border-b-2 border-black bg-white">
    <View className="w-24 h-24 border-2 border-black bg-gray-100">
      <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-black uppercase font-bold text-base">{item.name}</Text>
      <Text className="text-black text-sm my-1">Größe: M</Text>
      <Text className="text-black font-semibold text-lg">{item.price}</Text>
    </View>
    <View className="items-center">
      <Text className="text-black text-lg font-bold">{item.quantity}</Text>
      <TouchableOpacity onPress={() => {}} className="mt-2 p-1">
        <Icon name="trash" size={20} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

/**
 * The Shopping Cart screen with dynamic totals.
 */
const ShoppingCartScreen = () => {
  const { items } = useCart();
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
      <View className="flex-row items-center justify-between p-4 border-b-2 border-black">
        <Text className="text-black text-center font-bold text-xl uppercase tracking-widest flex-1">
          Dein Warenkorb
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* --- List of Items --- */}
        <View>
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <Text className="text-center p-8 text-gray-500">Dein Warenkorb ist leer.</Text>
          )}
        </View>

        {/* --- Order Summary with dynamic values --- */}
        {items.length > 0 && (
          <View className="p-4 mt-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-black uppercase text-base">PREIS</Text>
              <Text className="text-black font-semibold text-base">{subtotal} €</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-black uppercase text-base">Versand</Text>
              <Text className="text-black font-semibold text-base">KOSTENLOS</Text>
            </View>
            <View className="flex-row justify-between pt-4 border-t-2 border-black">
              <Text className="text-black uppercase font-bold text-lg">Gesamt</Text>
              <Text className="text-black font-bold text-lg">{total} €</Text>
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
