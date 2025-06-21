import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

// Import our custom Tabbar and the Home Stack
import { Tabbar } from '../components/organisms/Tabbar';
import HomeStackNavigator from './HomeStackNavigator';

// Import the new ShoppingCartScreen
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import FilterScreen from '../screens/FilterScreen.tsx';
import ProductStackNavigator from '../navigation/ProductStackNavigator.tsx';
import CheckoutScreen from '../screens/CheckoutScreen.tsx';
import AccountStackNavigator from '../navigation/AccountStackNavigator.tsx';
import WishlistScreen from '../screens/WishlistScreen.tsx';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator(); // Create the Root Stack

// Dummy screens for demonstration
const DummyScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

/**
 * This is our main app content with the bottom tab bar.
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <Tabbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />

      <Tab.Screen name="Produkte" component={ProductStackNavigator} />
      <Tab.Screen name="Merkliste" component={WishlistScreen} />
      <Tab.Screen name="User" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
}

/**
 * This is the new root navigator. It controls both the main app (with tabs)
 * and any modal screens that should appear over the entire app.
 */
function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* The main app with the tab bar */}
        <RootStack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        {/* Our Shopping Cart screen, presented as a modal */}
        <RootStack.Screen
          name="ShoppingCart"
          component={ShoppingCartScreen}
          options={{
            presentation: 'modal', // This makes it slide up from the bottom
            headerShown: false,      // We use the custom header inside the screen
          }}
        />
        <RootStack.Screen
          name="FilterScreen"
          component={FilterScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
        <RootStack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
