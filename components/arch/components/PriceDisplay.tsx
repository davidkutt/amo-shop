import React from 'react';
import { TextProps } from 'react-native';
import CustomText from 'components/arch/components/CustomText.tsx';

interface PriceDisplayProps extends TextProps {
  amount: number;
  currencySymbol?: string;
  className?: string;
}

export default function PriceDisplay({
  amount,
  currencySymbol = '$',
  className,
  ...rest
}: PriceDisplayProps) {
  const formattedPrice = `${currencySymbol}${amount.toFixed(2)}`;

  return (
    <CustomText className={className} {...rest}>
      {formattedPrice}
    </CustomText>
  );
}
