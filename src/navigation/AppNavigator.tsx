import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Tabbar } from 'components/organisms/Tabbar';
import HomeStackNavigator from 'navigation/HomeStackNavigator.tsx';
import ProductStackNavigator from 'navigation/ProductStackNavigator.tsx';
import AccountStackNavigator from 'navigation/AccountStackNavigator.tsx';
import WishlistStackNavigator from 'navigation/WishlistStackNavigator.tsx'; // <-- Import the new stack
import ShoppingCartScreen from 'screens/ShoppingCartScreen.tsx';
import FilterScreen from 'screens/FilterScreen.tsx';
import CheckoutScreen from 'screens/CheckoutScreen.tsx';
import OrderConfirmationScreen from 'screens/OrderConfirmationScreen.tsx';
import { ScrollProvider } from 'context/ScrollContext.tsx';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();


function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <Tabbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={ProductStackNavigator} />
      <Tab.Screen name="Heart" component={WishlistStackNavigator} />
      <Tab.Screen name="User" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <ScrollProvider>
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="FilterScreen" component={FilterScreen} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
    </ScrollProvider>
  );
}

export default AppNavigator;
