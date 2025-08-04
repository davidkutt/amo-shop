import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';

/**
 * Ein Bildschirm, der nach einem erfolgreichen Checkout angezeigt wird, um die Bestellung zu bestätigen.
 */
const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // In einer echten App würde die Bestellnummer vom Checkout-Prozess übergeben werden
  const orderId = '10525';

  const handleContinueShopping = () => {
    // Dies führt den Benutzer zurück zum ersten Bildschirm des Root-Stacks (dem Startbildschirm)
    navigation.popToTop();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-8">
        {/* --- Erfolgs-Icon --- */}
        <View className="w-24 h-24 border-4 border-black rounded-full items-center justify-center">
          <Icon name="check-2" size={60} color="black" />
        </View>

        {/* --- Bestätigungsnachricht --- */}
        <Text variant="title" className="text-center mt-8">
          Bestellung bestätigt!
        </Text>
        <Text variant="body" className="text-center mt-2">
          Vielen Dank für deine Bestellung.
        </Text>
        <Text variant="body" className="text-center mt-1">
          Bestellnummer: {orderId}
        </Text>
      </View>

      {/* --- Weiter einkaufen CTA --- */}
      <View className="p-4 border-t-2 border-black">
        <Button
          title="Weiter einkaufen"
          onPress={handleContinueShopping}
          className="bg-black border-black w-full"
          textClassName="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;
