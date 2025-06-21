import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import ProductGridScreen from '../screens/ProductGridScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { Header } from '../components/organisms/Header';
import HomeScreen from '../screens/HomeScreen.tsx'; // Our custom header

const Stack = createStackNavigator();

/**
 * This Stack Navigator handles the flow from the product grid to the product detail page.
 */
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      // Use our custom Header component for all screens in this stack
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="ProductGrid"
        component={HomeScreen}
        // We can customize the header title per screen if needed
        options={{ header: () => <Header /> }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        // The header will automatically get a back button on this screen
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
