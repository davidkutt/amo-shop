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
import { client } from 'services/shopifyService';
import AppNavigator from 'navigation/AppNavigator';

function AppContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, backgroundColor: '#f8fafc' }}>
      <AppNavigator />
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <AppContent />
        </GestureHandlerRootView>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;
