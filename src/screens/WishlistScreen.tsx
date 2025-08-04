import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { ProductCard } from 'components/organisms/ProductCard';
import { useWishlist } from 'context/WishlistContext.tsx';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// We'll need access to all products to filter them
// In a real app, this would come from a global state/store (e.g., Redux, Zustand)
const allProducts = [
  { id: '1', name: 'Hamptons Worn-Out Sneaker', price: '775 €', imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500' },
  { id: '2', name: 'Hamptons Medium Sneaker', price: '775 €', imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500' },
  { id: '3', name: 'Another Sneaker', price: '850 €', imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500' },
  { id: '4', name: 'Dark Sneaker', price: '695 €', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'},
];

/**
 * A screen that displays the user's saved wishlist items.
 */
const WishlistScreen = () => {
  const navigation = useNavigation();
  const { wishlistItems } = useWishlist();

  // Filter all products to get only the ones in the wishlist
  const favoritedProducts = allProducts.filter(product => wishlistItems.includes(product.id));

  // --- THIS IS THE CHANGE ---
  // This function now navigates to the correct screen within the correct stack.
  const handleProductPress = (product) => {
    // Navigate to the Suche tab, and within that tab's stack, go to the 'ProductDetail' screen.
    navigation.navigate('Suche', {
      screen: 'ProductDetail',
      params: { productId: product.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* The Header for this screen would be provided by its own Stack Navigator */}
      <View className="flex-row items-center justify-between p-4 border-b-2 border-text/20 bg-background">
        <Text variant="title" className="text-center flex-1">
          Merkliste
        </Text>
        {/*<TouchableOpacity onPress={() => navigation.goBack()}>*/}
        {/*  <Icon name="close" size={24} color="#334155" />*/}
        {/*</TouchableOpacity>*/}
      </View>
      <FlatList
        data={favoritedProducts}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // Show a message if the wishlist is empty
        ListEmptyComponent={() => (
          <View className="text-center p-8">
            <Text variant="body" className="text-text/70">Deine Merkliste ist leer.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;
