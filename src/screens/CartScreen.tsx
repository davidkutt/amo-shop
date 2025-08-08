import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const CartContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const CartScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCheckoutPress = () => {
    navigation.navigate('Checkout');
  };

  return (
    <CartContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Warenkorb"
        onBackPress={handleBackPress}
        onCartPress={() => {}}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Warenkorb
          </Text>
          <Text variant="body" color="textSecondary">
            Hier werden die Warenkorb-Artikel angezeigt.
          </Text>
        </View>
      </ScrollView>
    </CartContainer>
  );
};

export default CartScreen;
