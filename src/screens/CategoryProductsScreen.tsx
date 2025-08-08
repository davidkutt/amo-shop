import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { NavigationProps } from 'navigation/types';

const CategoryProductsContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const CategoryProductsScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { categoryId, categoryName } = route.params as { categoryId: string; categoryName: string };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <CategoryProductsContainer backgroundColor="background" flex={1}>
      <Header
        back
        title={categoryName}
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            {categoryName}
          </Text>
          <Text variant="body" color="textSecondary">
            Hier werden die Produkte der Kategorie {categoryId} angezeigt.
          </Text>
        </View>
      </ScrollView>
    </CategoryProductsContainer>
  );
};

export default CategoryProductsScreen;
