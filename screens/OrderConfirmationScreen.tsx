import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Icon } from '../components/atoms/Icon';

/**
 * A screen displayed after a successful checkout to confirm the order.
 */
const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // In a real app, the order ID would be passed from the checkout process
  const orderId =  '10525';

  const handleContinueShopping = () => {
    // This will take the user all the way back to the first screen of the root stack (the home screen)
   // navigation.popToTop();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-8">
        {/* --- Success Icon --- */}
        <View className="w-24 h-24 border-4 border-black rounded-full items-center justify-center">
          <Icon name="check-2" size={60} color="black" />
        </View>

        {/* --- Confirmation Message --- */}
        <Text className="text-black uppercase font-bold text-2xl text-center mt-8 tracking-wider">
          Thank You For Your Order
        </Text>
        <Text className="text-black text-center text-base mt-2">
          Your order #{orderId} has been placed.
        </Text>
        <Text className="text-black text-center text-base mt-1">
          A confirmation email has been sent to your address.
        </Text>
      </View>

      {/* --- Continue Shopping CTA --- */}
      <View className="p-4 border-t-2 border-black">
        <Button
          title="Continue Shopping"
          onPress={handleContinueShopping}
          className="bg-black border-black w-full"
          textClassName="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;
