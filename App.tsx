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

function App() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
    </SafeAreaView>  );
}

export default App;
