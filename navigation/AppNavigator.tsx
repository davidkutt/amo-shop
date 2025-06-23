import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import { Tabbar } from '../components/organisms/Tabbar';
import HomeStackNavigator from './HomeStackNavigator';
import ProductStackNavigator from './ProductStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';
import WishlistStackNavigator from './WishlistStackNavigator.tsx'; // <-- Import the new stack

import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import FilterScreen from '../screens/FilterScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const DummyScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <Tabbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Grid" component={ProductStackNavigator} />
      <Tab.Screen name="Merkliste" component={WishlistStackNavigator} />
      <Tab.Screen name="User" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="FilterScreen" component={FilterScreen} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
