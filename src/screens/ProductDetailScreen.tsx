import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCTS_BY_COLLECTION_HANDLE_QUERY } from 'services/shopifyService';
import { Text } from 'components/atoms/Text';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon'; // Make sure you have an Icon component
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { useCart } from 'context/CartContext';
import { useRecentlyViewedStore } from 'hooks/useRecentlyViewed.ts';

// --- Reusable Sub-components for this screen ---

const { width } = Dimensions.get('window');

const Pagination = ({ images, activeIndex }: { images: any[]; activeIndex: number }) => {
  return (
    <View className="absolute bottom-4 left-0 right-0 z-10">
      <View className="flex-row justify-center items-center py-2">
        {images.map((_, index) => {
          const dotStyle = activeIndex === index ? 'bg-primary' : 'bg-gray-400 opacity-70';
          return <View key={index} className={`h-2 w-2 rounded-full mx-1.5 ${dotStyle}`} />;
        })}
      </View>
    </View>
  );
};

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => (
  <View className="mb-6">
    <Text className="text-lg font-bold mb-3">Größe:</Text>
    <View className="flex-row flex-wrap">
      {sizes.map((size) => {
        const isSelected = size === selectedSize;
        return (
          <TouchableOpacity
            key={size}
            onPress={() => onSelectSize(size)}
            className={`min-w-[48px] h-12 justify-center items-center border rounded-md px-4 mr-3 mb-2 ${
              isSelected ? 'bg-primary border-primary' : 'border-gray-300'
            }`}
          >
            <Text className={`font-bold ${isSelected ? 'text-white' : 'text-text'}`}>{size}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const PersonalizationOption = ({ label, price, value, onValueChange }) => (
  <TouchableOpacity onPress={() => onValueChange(!value)} className="flex-row items-center mb-3">
    <View className={`w-6 h-6 border-2 rounded-md justify-center items-center mr-3 ${value ? 'bg-primary border-primary' : 'border-gray-300'}`}>
      {value && <Icon name="check" size={16} color="white" />}
    </View>
    <Text className="flex-1 text-base">{label}</Text>
    {price && <Text className="text-base">(+{price}€)</Text>}
  </TouchableOpacity>
);

const InfoBadge = ({ text, iconName }) => (
  <View className="flex-row items-center bg-accent-beige p-3 rounded-lg mb-3">
    <Icon name={iconName} size={20} color="#36454F" />
    <Text className="ml-3 text-sm text-text">{text}</Text>
  </View>
);

// --- Main ProductDetailScreen Component ---

const ProductDetailScreen = ({ route, navigation }: any) => {
  const { productHandle } = route.params;

  // --- STATE MANAGEMENT ---
  const { addItem } = useCart();
  const { addProduct } = useRecentlyViewedStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isNameEngraved, setIsNameEngraved] = useState<boolean>(false);
  const [isMetalChanged, setIsMetalChanged] = useState<boolean>(false);

  // --- DATA FETCHING ---
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_HANDLE_QUERY, {
    variables: { handle: productHandle },
  });

  const { data: relatedProductsData } = useQuery(GET_PRODUCTS_BY_COLLECTION_HANDLE_QUERY, {
    variables: { handle: 'beliebt', first: 10 }, // Using "beliebt" as a placeholder for related items
  });

  // --- HOOKS & REFS ---
  useEffect(() => {
    if (data?.product) {
      const productNode = data.product;
      const cleanProduct = {
        id: productNode.id, handle: productNode.handle, name: productNode.title,
        price: `${productNode.priceRange.minVariantPrice.amount} ${productNode.priceRange.minVariantPrice.currencyCode}`,
        imageUrl: productNode.images.edges[0]?.node.url || 'https://placehold.co/600x400',
        variantId: productNode.variants.edges[0]?.node.id
      };
      addProduct(cleanProduct);
    }
  }, [data, addProduct]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) { setActiveIndex(viewableItems[0].index ?? 0); }
  }).current;
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  // --- LOADING & ERROR STATES ---
  if (loading) {
    return <View className="flex-1 justify-center items-center bg-background"><ActivityIndicator size="large" color="#C4A484" /></View>;
  }
  if (error || !data?.product) {
    return <View className="flex-1 justify-center items-center p-5"><Text className="font-bold text-lg">Error Loading Product</Text><Text className="text-center mt-2">{error ? error.message : 'The product could not be found.'}</Text></View>;
  }

  // --- HELPER FUNCTIONS ---
  /**
   * Formats a price string (e.g., "84.90 EUR" or "69.9 EUR")
   * to German locale format (e.g., "84,90 EUR" or "69,90 EUR").
   * Ensures two decimal places and uses a comma as the decimal separator.
   */
  const formatPriceForGermanLocale = (priceString: string): string => {
    const parts = priceString.split(' ');
    if (parts.length < 2) {
      return priceString;
    }
    const amountStr = parts[0];
    const currencyCode = parts[1];
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      return priceString;
    }
    const formattedAmount = amount.toFixed(2);
    const finalAmount = formattedAmount.replace('.', ',');
    return `${finalAmount} ${currencyCode}`;
  };

  // --- DATA TRANSFORMATION ---
  const product = data.product;
  const images = product.images.edges.map((edge: any) => edge.node);
  const rawPrice = `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`;
  const price = formatPriceForGermanLocale(rawPrice); // Apply formatting here
  const isAvailable = product.variants.edges.some((edge: any) => edge.node.availableForSale);
  const sizeOption = product.options?.find(
    (opt) => opt.name.toLowerCase() === 'größe' || opt.name.toLowerCase() === 'size'
  );
  const availableSizes = sizeOption ? sizeOption.values : [];
  const relatedProducts = relatedProductsData?.collection.products.edges.map(({ node }) => ({
    id: node.id, handle: node.handle, name: node.title,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    imageUrl: node.images.edges[0]?.node.url || 'https://placehold.co/600x400',
    variantId: node.variants.edges[0]?.node.id,
  }));

  // --- EVENT HANDLERS ---
  const handleAddToCart = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      Alert.alert('Bitte Größe wählen', 'Du musst eine Größe auswählen, um den Artikel in den Warenkorb zu legen.');
      return;
    }
    const firstAvailableVariant = product.variants.edges.find((edge) => edge.node.availableForSale)?.node;
    if (firstAvailableVariant) {
      addItem({
        id: product.id, variantId: firstAvailableVariant.id, name: product.title,
        price: product.priceRange.minVariantPrice.amount, imageUrl: images[0]?.url, handle: product.handle,
        options: {
          Größe: selectedSize,
          Namensaufdruck: isNameEngraved,
          Metallfarbe: isMetalChanged,
        },
      });
      Alert.alert('Erfolg!', `${product.title} wurde zum Warenkorb hinzugefügt.`);
    } else {
      Alert.alert('Nicht verfügbar', 'Dieses Produkt ist zur Zeit ausverkauft.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      {/* --- Image Gallery Section --- */}
      {images && images.length > 0 ? (
        <View style={{ height: width }}>
          <FlatList
            data={images} renderItem={({ item }) => <Image source={{ uri: item.url }} style={{ width, height: width }} resizeMode="cover" />}
            keyExtractor={(item, index) => item.url + index} horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged} viewabilityConfig={viewabilityConfig}
          />
          {images.length > 1 && <Pagination images={images} activeIndex={activeIndex} />}
        </View>
      ) : (
        <View style={{ height: width }} className="bg-gray-100 justify-center items-center"><Text>No Image Available</Text></View>
      )}

      {/* --- Product Details Section --- */}
      <View className="p-5">
        <Text className="text-2xl mb-2 text-text" >{product.title}</Text>
        <Text className="text-xl mb-6 text-text font-semibold">{price}</Text>

        {availableSizes.length > 0 && (
          <SizeSelector sizes={availableSizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
        )}

        <View className="mb-6">
          <Text className="text-lg font-bold mb-3 text-text">Personalisierung:</Text>
          <PersonalizationOption label="mit Namensaufdruck" price="17" value={isNameEngraved} onValueChange={setIsNameEngraved} />
          <PersonalizationOption label="Metallteilfarbe ändern" price="5" value={isMetalChanged} onValueChange={setIsMetalChanged} />
        </View>

        <Button title={isAvailable ? "In den Warenkorb" : "Ausverkauft"} onPress={handleAddToCart} disabled={!isAvailable} />
      </View>

      {/* --- Trust Badges Section --- */}
      <View className="px-5 py-4 border-t border-gray-200">
        <InfoBadge text="unterstützt unsere Tierschutzmission" iconName="heart" />
        <InfoBadge text="Kostenloser Versand in DE ab €100" iconName="truck" />
      </View>

      {/* --- Complete the Look Section --- */}
      {relatedProducts && relatedProducts.length > 0 && (
        <HorizontalProductCarousel
          title="Mach den Look komplett"
          products={relatedProducts}
          onProductPress={(productHandle) => navigation.push('ProductDetail', { productHandle })}
        />
      )}
    </ScrollView>
  );
};

export default ProductDetailScreen;
