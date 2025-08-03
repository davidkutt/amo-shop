import React from 'react';
import { Alert, View, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import Animated from 'react-native-reanimated';

// --- COMPONENTS ---
import { Text } from 'components/atoms/Text';
import { HeroSection } from 'components/organisms/HeroSection';
import { PersonalityPacksCarousel } from 'components/organisms/PersonalityPacksCarousel';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { RecentlyViewed } from 'components/organisms/RecentlyViewed';

// --- HOOKS & SERVICES ---
import { GET_PRODUCTS_BY_COLLECTION_HANDLE_QUERY } from 'services/shopifyService.ts';
import { useRecentlyViewedStore } from 'hooks/useRecentlyViewed.ts';
import { useScroll } from 'context/ScrollContext.tsx';
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/component/ScrollView';
import { ShopTheLook } from 'components/organisms/ShopTheLook';
import { VisualCategoryNavigation } from 'components/organisms/VisualCategoryNavigation';
import { HeroCarousel } from 'components/organisms/HeroCarousel';

// MOCK_SLIDES data remains the same...
const MOCK_SLIDES = [
  {
    id: 'collection_goa',
    image: require('../../assets/7.webp'),
    title: 'Die Goa Kollektion',
    subtitle: 'Inspiriert von der Farbenpracht Indiens',
    badge: 'NEU',
  },
  {
    id: 'collection_essentials',
    image: require('../../assets/naxos1.webp'),
    title: 'Essential Leinen',
    subtitle: 'Für den täglichen Spaziergang',
  },
  {
    id: 'collection_winter',
    image: require('../../assets/schmuckketten_haarbaender2.webp'),
    title: 'Winter Wonderland',
    subtitle: 'Kuschelige Accessoires für kalte Tage',
    badge: 'LIMITED',
  },
  {
    id: 'collection_travel',
    image: require('../../assets/Travel_and_Guide_Facebook_Cover-3_7bc8ca6a-c9e5-4262-bca5-0e3f590ae77f.webp'),
    title: 'Perfekt für die Reise',
    subtitle: 'Alles für euer nächstes Abenteuer',
  },
];

const HomeScreen = ({ navigation }) => {
  // 1. Get the global scroll handler from our context
  const { scrollHandler } = useScroll();

  // --- DATA FETCHING ---
  // Fetch a collection to serve as our "New Arrivals"
  const { data: newArrivalsData, loading, error } = useQuery(
    GET_PRODUCTS_BY_COLLECTION_HANDLE_QUERY,
    { variables: { handle: 'beliebt', first: 10 } }
  );

  const { data: allCategories, loading: categoriesLoading, error: categoriesError } = useQuery(
    GET_COLLECTIONS_QUERY,
    { variables: { first: 20 } }
  );

  const { data: lookData, loading: lookLoading, error: lookError } = useQuery(
    GET_COLLECTION_INFO_BY_HANDLE_QUERY,
    { variables: { handle: 'look-bohemian-summer' } }
  );

  const { products: recentlyViewedProducts } = useRecentlyViewedStore();

  // --- LOADING & ERROR STATES ---
  if (productsLoading || categoriesLoading || lookLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#C4A484" />
      </View>
    );
  }

  if (productsError || categoriesError || lookError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-center font-bold">Fehler beim Laden der Daten.</Text>
        <Text className="text-center text-text/70">
          {productsError?.message || categoriesError?.message || lookError?.message}
        </Text>
      </View>
    );
  }

  // --- DATA TRANSFORMATION ---
  const bestsellers = bestsellersData?.collection.products.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    variantId: node.variants.edges[0]?.node.id,
    name: node.title,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    imageUrl: node.images.edges[0]?.node.url || 'https://placehold.co/600x400',
  }));

  const categories = allCategories?.collections.edges
    .map(({ node }) => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      image: { uri: node.image?.url },
    }))
    .filter((category) =>
      category.handle !== 'beliebt' &&
      category.handle !== 'all' &&
      !category.handle.startsWith('look-')
    );

  const look = lookData?.collection
    ? {
      collectionHandle: lookData.collection.handle,
      title: lookData.collection.title,
      imageUrl: lookData.collection.image?.url,
      description: lookData.collection.description,
    }
    : null;

  const handleSlidePress = (slideId: string) => Alert.alert('Carousel Tap', `Navigating to collection: ${slideId}`);
  const handleProductPress = (productHandle: string) => Alert.alert('Product Tap', `Navigating to product: ${productHandle}`);
  const handleCategoryPress = (categoryId: string) => Alert.alert('Category Tap', `Navigating to category: ${categoryId}`);
  const handleShopLookPress = (collectionHandle: string) => Alert.alert('Shop The Look', `Navigating to collection: ${collectionHandle}`);
  const MOCK_PACKS = [
    { id: '1', title: 'For the Adventurer', iconName: 'map-pin' , color: 'bg-sky-300', handle: 'adventurer' },
    { id: '2', title: 'For the Cuddler', iconName: 'heart', color: 'bg-pink-300', handle: 'cuddler' },
    { id: '3', title: 'For the Trendsetter', iconName: 'star' , color: 'bg-yellow-300', handle: 'trendsetter' },
    { id: '4', title: 'For the Playful Pup', iconName: 'award' , color: 'bg-teal-300', handle: 'playful' },
  ];

  return (
    <AnimatedScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16} // This is crucial for smooth animations
      className="bg-background"
    >
      {/* --- "JOYFUL & PLAYFUL" HOME SCREEN SECTIONS --- */}

        <HeroSection
            title="Good morning, sunshine!"
            image={MOCK_SLIDES[0].image}
            backgroundColor="bg-yellow-300" // Using a sunny yellow from our new palette
        />
        <PersonalityPacksCarousel
          title="Shop by Vibe ✨"
          packs={MOCK_PACKS}
          onPackPress={() => {
            Alert.alert('Navigate to Collection', `Handle: ${handle}`);
          }}
        />        <HeroCarousel slides={MOCK_SLIDES} onSlidePress={handleSlidePress} />

        {bestsellers && bestsellers.length > 0 && (
          <HorizontalProductCarousel
            title="Beliebt"
            products={bestsellers}
            onProductPress={handleProductPress}
          />
        )}

        {categories && categories.length > 0 && (
          <VisualCategoryNavigation
            categories={categories}
            onCategoryPress={handleCategoryPress}
          />
        )}
        {recentlyViewedProducts.length > 0 && (
            <RecentlyViewed
                title="Zuletzt Angesehen"
                products={recentlyViewedProducts}
                onProductPress={handleProductPress} // Assuming RecentlyViewed is also pressable
            />
        )}
        {look && look.imageUrl && (
          <ShopTheLook look={look} onPress={handleShopLookPress} />
        )}
      </AnimatedScrollView>
  );
};

export default HomeScreen;
