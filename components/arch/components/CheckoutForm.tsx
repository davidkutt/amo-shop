import React from 'react';
import { View } from 'react-native';
import CustomInput from 'components/arch/components/CustomInput.tsx';
import CustomText from 'components/arch/components/CustomText.tsx';

export default function CheckoutForm() {
  return (
    <View>
      <CustomText className="text-xl font-bold mb-4">
        Shipping Address
      </CustomText>
      <CustomInput
        placeholder="Full Name"
        className="mb-3"
      />
      <CustomInput
        placeholder="Address Line 1"
        className="mb-3"
      />
      <CustomInput
        placeholder="City"
        className="mb-3"
      />
      <CustomInput
        placeholder="Postal Code"
        className="mb-3"
      />
      <CustomInput
        placeholder="Country"
        className="mb-3"
      />

      <CustomText className="text-xl font-bold mt-6 mb-4">
        Payment Information
      </CustomText>
      <CustomInput
        placeholder="Card Number"
        className="mb-3"
      />
      <CustomInput
        placeholder="Expiry Date (MM/YY)"
        className="mb-3"
      />
      <CustomInput
        placeholder="CVV"
        className="mb-3"
      />
    </View>
  );
}
