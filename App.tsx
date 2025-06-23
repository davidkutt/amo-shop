/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import "./global.css"
import { Input } from './components/atoms/Input';
import { ProductCard } from './components/organisms/ProductCard';
import ProductGridScreen from './screens/ProductGridScreen.tsx';
import { Header } from './components/organisms/Header';
import { SearchBar } from './components/molecules/SearchBar';
import ProductDetailScreen from './screens/ProductDetailScreen.tsx';
import AppNavigator from './navigation/AppNavigator.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { client } from './services/shopifyService.ts';

function App() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <ApolloProvider client={client}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <CartProvider>
          <WishlistProvider>

        {/*<Header/>*/}
        {/*<SearchBar/>*/}
        {/*<ProductGridScreen/>*/}
      <AppNavigator screenOptions={{ headerShown: false }}/>
          </WishlistProvider>
        </CartProvider>
      </GestureHandlerRootView>
      </ApolloProvider>
    </SafeAreaView>
  );
}

export default App;
