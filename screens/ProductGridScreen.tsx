import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ProductCard } from '../components/organisms/ProductCard';
import { FilterBar } from '../components/organisms/FilterBar';
// We would need to create/restyle the Header and SubNav components next
// import { Header } from '../components/organisms/Header';

// Sample data updated to match the new props
const products = [
  { id: '1', name: 'Hamptons Worn-Out Sneaker', price: '775 €', imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500', preOrderText: 'Jetzt vorbestellen', colorCount: 3 },
  { id: '2', name: 'Hamptons Medium Worn-Out Sneaker', price: '775 €', imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500', preOrderText: 'Jetzt vorbestellen' },
  { id: '3', name: 'Another Sneaker', price: '850 €', imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500' },
  { id: '4', name: 'Dark Sneaker', price: '695 €', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
];


const ProductGridScreen = ({navigation}) => {
  return (
    // The screen background is plain white
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* We would place our restyled Header and SubNav components here */}
      <FilterBar productCount={products.length} />

      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            onPress={() =>     navigation.navigate('ProductDetail', { productId: item.id })
            }
            index={index} // Pass the index to handle borders
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // Remove all content container styling to let cards sit flush
        contentContainerStyle={{}}
      />
    </SafeAreaView>
  );
};

export default ProductGridScreen;
