import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import ProductGridScreen from 'screens/ProductGridScreen.tsx';
import ProductDetailScreen from 'screens/ProductDetailScreen.tsx';
import { Header } from 'components/organisms/Header';

const Stack = createStackNavigator();

/**
 * This Stack Navigator handles the flow from the product grid to the product detail page.
 */
const ProductStackNavigator = () => {
  return (
    <Stack.Navigator
      // Use our custom Header component for all screens in this stack
      screenOptions={{
        header: () =>  <Header back={false} />
      }}
    >
      <Stack.Screen
        name="ProductGrid"
        component={ProductGridScreen}
        // We can customize the header title per screen if needed
        options={{ header: () => <Header back={false} /> }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ header: () => <Header back={true} /> }}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
