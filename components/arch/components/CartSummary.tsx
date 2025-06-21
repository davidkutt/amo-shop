import React from 'react';
import { View } from 'react-native';
import CustomText from 'components/arch/components/CustomText.tsx';
import PriceDisplay from 'components/arch/components/PriceDisplay.tsx';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  total: number;
}

export default function CartSummary({
  subtotal,
  shipping,
  total,
}: CartSummaryProps) {
  return (
    <View className="p-4 border-t border-gray-200 bg-gray-50">
      <View className="flex-row justify-between items-center mb-1">
        <CustomText>Subtotal</CustomText>
        <PriceDisplay amount={subtotal} />
      </View>
      {shipping !== undefined && (
        <View className="flex-row justify-between items-center mb-1">
          <CustomText>Shipping</CustomText>
          <PriceDisplay amount={shipping} />
        </View>
      )}
      <View className="flex-row justify-between items-center mt-2">
        <CustomText className="text-lg font-bold">Total</CustomText>
        <PriceDisplay amount={total} className="text-xl font-bold" />
      </View>
    </View>
  );
}
