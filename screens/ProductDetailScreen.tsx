import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
  StyleSheet,
} from 'react-native';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Disclosure } from '../components/molecules/Disclosure';
import { ColorSelector } from '../components/molecules/ColorSelector';
import { useCart } from '../context/CartContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const IMAGE_GALLERY_HEIGHT = screenHeight * 0.5;

// This would typically come from a global state or API call
const allProducts = [
  { id: '1', name: 'Hamptons Worn-Out Sneaker', price: '775 €', images: [ 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800', 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' ], imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800', availableColors: ['#FFFFFF', '#000000', '#DE3163', '#6495ED'], description: 'A classic silhouette re-imagined with a pre-distressed finish for a vintage feel. Made from premium calfskin leather and featuring a durable rubber sole.', materials: 'Upper: 100% Calfskin Leather\nSole: 100% Rubber' },
  { id: '2', name: 'Another Sneaker', price: '850 €', images: ['https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800'], imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800', availableColors: ['#000000'], description: 'Another great sneaker.', materials: '100% Synthetic' },
];

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const product = useMemo(() => allProducts.find(p => p.id === productId), [productId]);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addItem } = useCart();

  const onScroll = (event) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
      event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View style={{ height: IMAGE_GALLERY_HEIGHT }} className="border-b-2 border-black">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {product.images.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{ width: screenWidth, height: IMAGE_GALLERY_HEIGHT }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View style={styles.paginationContainer}>
            {product.images.map((_, index) => (
              <View
                key={index}
                // --- THIS IS THE FIX ---
                // We now use StyleSheet styles exclusively for the dots
                style={[
                  styles.dot,
                  activeImageIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* --- Product Info --- */}
        <View className="p-4">
          <Text className="text-black uppercase font-bold text-2xl tracking-wider">
            {product.name}
          </Text>
          <Text className="text-black font-semibold text-xl my-2">
            {product.price}
          </Text>
          <View className="my-4">
            <ColorSelector
              colors={product.availableColors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </View>
        </View>

        {/* --- Full-Width CTA Button --- */}
        <View className="px-4 pb-4 border-b-2 border-black">
          <Button
            title="In den Warenkorb"
            onPress={handleAddToCart}
            className="bg-black border-black w-full"
            textClassName="text-white"
          />
        </View>

        {/* --- Collapsible Details --- */}
        <View>
          <Disclosure summary="Produktbeschreibung">
            <Text className="text-black">{product.description}</Text>
          </Disclosure>
          <Disclosure summary="Material">
            <Text className="text-black">{product.materials}</Text>
          </Disclosure>
          <Disclosure summary="Versand und Retoure">
            <Text className="text-black">
              Complimentary shipping on all orders. Returns are accepted within
              30 days of delivery.
            </Text>
          </Disclosure>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Define the styles using StyleSheet for guaranteed rendering
const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's on top
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000000', // Solid black for high contrast
  },
});

export default ProductDetailScreen;
