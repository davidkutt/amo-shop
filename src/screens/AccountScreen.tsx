import React from 'react';
import { ScrollView } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const Box = createBox<Theme>();

const AccountScreen: React.FC<NavigationProps> = ({ navigation }) => {
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
        title="Konto"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Konto
          </Text>
          <Text variant="body" color="textSecondary">
            Account management will be implemented here.
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default AccountScreen;
