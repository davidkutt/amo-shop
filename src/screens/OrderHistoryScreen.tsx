import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const OrderHistoryContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const OrderHistoryScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <OrderHistoryContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Bestellverlauf"
        onBackPress={handleBackPress}
        onCartPress={() => {}}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Bestellverlauf
          </Text>
          <Text variant="body" color="textSecondary">
            Hier wird der Bestellverlauf angezeigt.
          </Text>
        </View>
      </ScrollView>
    </OrderHistoryContainer>
  );
};

export default OrderHistoryScreen;
