import React from 'react';
import { View } from 'react-native';
import CustomButton from 'components/arch/components/CustomButton.tsx';
import CustomText from 'components/arch/components/CustomText.tsx';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
}: QuantitySelectorProps) {
  return (
    <View className="flex-row items-center">
      <CustomButton
        title="-"
        onPress={onDecrease}
        variant="secondary"
        className="px-3 py-1 rounded-full"
        textClassName="text-lg"
        disabled={quantity <= minQuantity}
      />
      <CustomText className="mx-4 text-lg font-medium">
        {quantity}
      </CustomText>
      <CustomButton
        title="+"
        onPress={onIncrease}
        variant="secondary"
        className="px-3 py-1 rounded-full"
        textClassName="text-lg"
      />
    </View>
  );
}
