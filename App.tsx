/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import "./global.css"
import { CartProvider } from 'context/CartContext.tsx';
import { WishlistProvider } from 'context/WishlistContext.tsx';
import { ScrollProvider } from 'context/ScrollContext.tsx';
import { client } from 'services/shopifyService.ts';
import AppNavigator from 'navigation/AppNavigator.tsx';

function AppContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, backgroundColor: '#f8fafc' }}>
      <AppNavigator screenOptions={{ headerShown: false }}/>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollProvider>
            <CartProvider>
              <WishlistProvider>
                <StatusBar barStyle="dark-content" />
                <AppContent />
              </WishlistProvider>
            </CartProvider>
          </ScrollProvider>
        </GestureHandlerRootView>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;
