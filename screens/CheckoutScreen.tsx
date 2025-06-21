import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Icon } from '../components/atoms/Icon';
import { TextInputField } from '../components/molecules/TextInputField'; // Import our new component

/**
 * The Checkout screen.
 */
const CheckoutScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* --- Screen Header --- */}
      <View className="flex-row items-center justify-between p-4 border-b-2 border-black">
        <Text className="text-black text-center font-bold text-xl uppercase tracking-widest flex-1">
          Checkout
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* --- Shipping Address Section --- */}
        <View className="p-4 border-b-2 border-black">
          <Text className="text-black uppercase font-bold text-lg mb-4">
            Shipping Address
          </Text>
          <View className="gap-y-4">
            <TextInputField label="Email Address" placeholder="you@example.com" keyboardType="email-address" />
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <TextInputField label="First Name" />
              </View>
              <View className="flex-1">
                <TextInputField label="Last Name" />
              </View>
            </View>
            <TextInputField label="Address" />
            <TextInputField label="City" />
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <TextInputField label="Postal Code" />
              </View>
              <View className="flex-1">
                <TextInputField label="Country" />
              </View>
            </View>
          </View>
        </View>

        {/* --- Payment Method Section --- */}
        <View className="p-4 border-b-2 border-black">
          <Text className="text-black uppercase font-bold text-lg mb-4">
            Payment Method
          </Text>
          <View className="gap-y-4">
            <TextInputField label="Card Number" placeholder="**** **** **** ****" keyboardType="numeric" />
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <TextInputField label="Expiry Date" placeholder="MM / YY" />
              </View>
              <View className="flex-1">
                <TextInputField label="CVV" placeholder="123" keyboardType="numeric" />
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* --- Place Order CTA --- */}
      <View className="p-4 border-t-2 border-black absolute bottom-0 w-full bg-white">
        <Button
          title="Place Order"
          onPress={() => {}}
          className="bg-black border-black w-full"
          textClassName="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
