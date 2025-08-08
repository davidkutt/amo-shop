import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const AccountContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const AccountScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <AccountContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Kontodetails"
        onBackPress={handleBackPress}
        onCartPress={() => {}}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Kontodetails
          </Text>
          <Text variant="body" color="textSecondary">
            Hier werden die Kontodetails verwaltet.
          </Text>
        </View>
      </ScrollView>
    </AccountContainer>
  );
};

export default AccountScreen;
