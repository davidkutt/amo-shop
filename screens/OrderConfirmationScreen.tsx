import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Icon } from '../components/atoms/Icon';

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
      <View className="flex-1 justify-center items-center p-8">
        {/* --- Erfolgs-Icon --- */}
        <View className="w-24 h-24 border-4 border-black rounded-full items-center justify-center">
          <Icon name="check-2" size={60} color="black" />
        </View>

        {/* --- Bestätigungsnachricht --- */}
        <Text className="text-black uppercase font-bold text-2xl text-center mt-8 tracking-wider">
          Vielen Dank für Ihre Bestellung
        </Text>
        <Text className="text-black text-center text-base mt-2">
          Ihre Bestellung #{orderId} wurde aufgegeben.
        </Text>
        <Text className="text-black text-center text-base mt-1">
          Eine Bestätigungs-E-Mail wurde an Ihre E-Mail Adresse gesendet.
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
