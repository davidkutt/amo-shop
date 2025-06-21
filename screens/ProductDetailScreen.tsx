import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Disclosure } from '../components/molecules/Disclosure';
import { ColorSelector } from '../components/molecules/ColorSelector';
import { useCart } from '../context/CartContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const IMAGE_GALLERY_HEIGHT = screenHeight * 0.5; // Calculate height as 50% of the screen height

// This would typically come from a global state or API call
const allProducts = [
  {
    id: '1',
    name: 'Hamptons Worn-Out Sneaker',
    price: '775 €',
    images: [ 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800', 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' ],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    availableColors: ['#FFFFFF', '#000000', '#DE3163', '#6495ED'],
    description: 'A classic silhouette re-imagined with a pre-distressed finish for a vintage feel. Made from premium calfskin leather and featuring a durable rubber sole.',
    materials: 'Upper: 100% Calfskin Leather\nSole: 100% Rubber'
  },
  {
    id: '2',
    name: 'Hamptons Medium Worn-Out Sneaker',
    price: '775 €',
    images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500'],
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
    availableColors: ['#F0F0E0', '#D2B48C'],
    description: 'A medium-worn version of the classic Hamptons sneaker for a balanced look.',
    materials: 'Upper: 100% Suede\nSole: 100% Rubber'
  },
  {
    id: '3',
    name: 'Another Sneaker',
    price: '850 €',
    images: ['https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500'],
    imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500',
    availableColors: ['#36454F', '#FFFFFF'],
    description: 'A modern, high-top sneaker with a bold design.',
    materials: 'Upper: 100% Canvas\nSole: 100% Vulcanized Rubber'
  },
  {
    id: '4',
    name: 'Dark Sneaker',
    price: '695 €',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    availableColors: ['#FF0000', '#000000'],
    description: 'A sleek, dark running shoe designed for performance and style.',
    materials: 'Upper: 100% Flyknit\nSole: 100% Foam Composite'
  },
];


/**
 * The Product Detail Page (PDP).
 * This screen showcases a single product with all its details.
 */
const ProductDetailScreen = ({ route }) => {
  // 1. Get the productId from the route params passed during navigation.
  const { productId } = route.params;

  // 2. Find the correct product from our master list.
  const product = useMemo(() => allProducts.find(p => p.id === productId), [productId]);

  // --- THIS IS THE FIX ---
  // If for some reason the product isn't found, show a message and exit early.
  // This prevents the hooks below from crashing the app.
  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text>Product not found.</Text>
      </SafeAreaView>
    );
  }

  // 3. Initialize state only AFTER we know the product exists.
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
    Alert.alert('Added to Bag', `${product.name} has been added to your shopping bag.`);
  };

  // 4. Render the details for the found product.
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* --- Image Gallery --- */}
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
                // The image now has an explicit width AND height
                style={{ width: screenWidth, height: IMAGE_GALLERY_HEIGHT }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {/* Pagination Dots */}
          <View className="absolute bottom-4 w-full flex-row justify-center items-center gap-x-2">
            {product.images.map((_, index) => (
              <View
                key={index}
                className={`
                  w-2 h-2 rounded-full border border-black
                  ${activeImageIndex === index ? 'bg-black' : 'bg-white/50'}
                `}
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

        {/* --- Full-Width CTA Button (NOW FUNCTIONAL) --- */}
        <View className="px-4 pb-4 border-b-2 border-black">
          <Button
            title="Add to Bag"
            onPress={handleAddToCart}
            className="bg-black border-black w-full"
            textClassName="text-white"
          />
        </View>

        {/* --- Collapsible Details --- */}
        <View>
          <Disclosure summary="Product Description">
            <Text className="text-black">{product.description}</Text>
          </Disclosure>
          <Disclosure summary="Materials">
            <Text className="text-black">{product.materials}</Text>
          </Disclosure>
          <Disclosure summary="Shipping & Returns">
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

export default ProductDetailScreen;
