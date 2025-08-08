import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const ProductDetailContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const ProductDetailScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { productId } = route.params as { productId: string };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ProductDetailContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Produktdetails"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Produkt {productId}
          </Text>
          <Text variant="body" color="textSecondary">
            Hier werden die Produktdetails angezeigt.
          </Text>
        </View>
      </ScrollView>
    </ProductDetailContainer>
  );
};

export default ProductDetailScreen;
