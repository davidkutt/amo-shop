import React, { useState } from 'react';
import { View, SafeAreaView, Alert, FlatList } from 'react-native';
import { ProductCard } from '../components/organisms/ProductCard';
import { Header } from '../components/organisms/Header'; // We will still use our Header component
import { Text } from '../components/atoms/Text';
import { SearchBar } from '../components/molecules/SearchBar';

// ... (Sample product data remains the same)
const products = [
  { id: '1', name: 'Classic White Tee', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500', rating: 4.5, reviewCount: 112 },
  { id: '2', name: 'Denim Jeans', price: 79.50, imageUrl: 'https://images.unsplash.com/photo-1602293589910-4535a9a7c8c1?w=500', rating: 4.8, reviewCount: 254 },
];


const ProductGridScreen = () => {
  const [query, setQuery] = useState('');

  return (
    // Use a solid, neutral background color for the screen
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D1D5DB' }}>
      {/* The Header is now a simple, static component */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
      />
      <Header title="New Arrivals" />

      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => Alert.alert('Navigate to Product', item.name)}
              containerClassName="m-2"
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: 'space-around',
            paddingTop: 10, // Adjust padding as needed
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductGridScreen;
