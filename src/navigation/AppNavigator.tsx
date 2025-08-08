import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation/types';

// Import navigators
import MainTabNavigator from 'navigation/MainTabNavigator';

// Import screens (we'll create these next)
import ProductDetailScreen from 'screens/ProductDetailScreen';
import CategoryProductsScreen from 'screens/CategoryProductsScreen';
import CartScreen from 'screens/CartScreen';
import CheckoutScreen from 'screens/CheckoutScreen';
import AccountScreen from 'screens/AccountScreen';
import OrderHistoryScreen from 'screens/OrderHistoryScreen';
import ComponentShowcaseScreen from 'screens/ComponentShowcaseScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="ComponentShowcase" component={ComponentShowcaseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
