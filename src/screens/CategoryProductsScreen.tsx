import React from 'react';
import { ScrollView } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const Box = createBox<Theme>();

const CategoryProductsScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { categoryId, categoryName } = route.params as { categoryId: string; categoryName: string };

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
        title={categoryName}
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            {categoryName}
          </Text>
          <Text variant="body" color="textSecondary">
            Products for {categoryName} will be displayed here.
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CategoryProductsScreen;
