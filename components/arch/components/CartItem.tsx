import React from 'react';
import { View } from 'react-native';
import ImageWrapper from 'components/arch/components/ImageWrapper.tsx';
import CustomText from 'components/arch/components/CustomText.tsx';
import PriceDisplay from 'components/arch/components/PriceDisplay.tsx';
import QuantitySelector from 'components/arch/components/QuantitySelector.tsx';
import CustomButton from 'components/arch/components/CustomButton.tsx';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  imageSource: any;
  quantity: number;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  return (
    <View className="flex-row items-center p-3 border-b border-gray-200">
      <ImageWrapper
         source={item.imageSource}
        className="w-16 h-16 rounded mr-3"
        resizeMode="cover"
      />
      <View className="flex-1 mr-2">
        <CustomText className="font-medium mb-1">
          {item.name}
        </CustomText>
        <PriceDisplay amount={item.price} />
      </View>
      <QuantitySelector
        quantity={item.quantity}
        onIncrease={() => onQuantityChange(item.id, item.quantity + 1)}
        onDecrease={handleDecrease}
        minQuantity={1}
      />
      <CustomButton
        title="X"
        onPress={() => onRemove(item.id)}
        className="ml-2 bg-red-300 px-2 py-1 rounded-full"
        textClassName="text-red-600 text-xs"
      />
    </View>
  );
}
