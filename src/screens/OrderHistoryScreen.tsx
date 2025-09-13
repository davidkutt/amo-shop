import React from 'react';
import { ScrollView } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const Box = createBox<Theme>();

const OrderHistoryScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title="Bestellverlauf"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Bestellverlauf
          </Text>
          <Text variant="body" color="textSecondary">
            Order history will be displayed here.
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default OrderHistoryScreen;
