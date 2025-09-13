import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import HeroSection from 'components/organisms/HeroSection';
import HeroCarousel from 'components/organisms/HeroCarousel';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import PersonalityPacksCarousel from 'components/organisms/PersonalityPacksCarousel';
import { CategoryCard } from 'components/organisms/CategoryCard';
import RecentlyViewed from 'components/organisms/RecentlyViewed';
import { NavigationProps } from 'navigation/types';
import { 
  ShopifyService, 
  RecentlyViewedService, 
  Collection,
  Product,
  ProductCategory 
} from '../services';
import { useWishlist } from 'hooks/useWishlist';
import { useCart } from 'hooks/useCart';

const Box = createBox<Theme>();

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // State management
  const [collections, setCollections] = useState<Collection[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Zustand stores
  const { 
    items: wishlistItems, 
    isInWishlist, 
    toggleWishlist,
    loadWishlist 
  } = useWishlist();
  
  const { 
    itemCount: cartItemCount, 
    addItem: addToCart,
    loadCart 
  } = useCart();

  // Load data on component mount
  useEffect(() => {
    loadData();
    loadWishlist();
    loadCart();
  }, [loadWishlist, loadCart]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load collections (Design Collections)
      const collectionsData = await ShopifyService.getCollections();
      setCollections(collectionsData);
      
      // Load recently viewed products
      const recentlyViewedData = await RecentlyViewedService.getRecentlyViewed();
      setRecentlyViewed(recentlyViewedData);
      
    } catch (error) {
      console.error('Error loading home screen data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleProductPress = async (product: any) => {
    // Find the full product data
    const fullProduct = collections
      .flatMap(c => c.products)
      .find(p => p.id === product.id);
    
    if (fullProduct) {
      // Add to recently viewed
      await RecentlyViewedService.addProduct(fullProduct);
      
      // Navigate to product detail
      navigation.navigate('ProductDetail', { productId: product.id });
    }
  };

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('CategoryProducts', { categoryId, categoryName });
  };

  const handleCollectionPress = (collection: Collection) => {
    navigation.navigate('Search', { 
      initialFilters: { collection: collection.handle },
      initialTitle: collection.title 
    });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleWishlistToggle = async (productId: string) => {
    try {
      // Find the product in collections
      const product = collections
        .flatMap(c => c.products)
        .find(p => p.id === productId);
      
      if (product) {
        await toggleWishlist(product);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      // Find the product
      const product = collections
        .flatMap(c => c.products)
        .find(p => p.id === productId);
      
      if (product) {
        await addToCart({
          product,
          quantity: 1,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Helper function to convert our Product type to component's expected type
  const mapProductForCarousel = (product: Product) => ({
    id: product.id,
    handle: product.handle,
    variantId: product.variantId,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    rating: product.rating,
    reviewCount: product.reviewCount,
  });

  // Product categories as defined in PRD
  const categories = [
    {
      id: 'dog-collar' as ProductCategory,
      title: 'Halsbänder',
      image: { uri: 'https://placehold.co/300x200' },
    },
    {
      id: 'clip-on-bandana' as ProductCategory,
      title: 'Bandanas',
      image: { uri: 'https://placehold.co/300x200' },
    },
    {
      id: 'feeding mat' as ProductCategory,
      title: 'Futtermatten',
      image: { uri: 'https://placehold.co/300x200' },
    },
    {
      id: 'bowl' as ProductCategory,
      title: 'Näpfe',
      image: { uri: 'https://placehold.co/300x200' },
    },
  ];

  // Hero carousel data from collections
  const heroCarouselData = collections.map(collection => ({
    id: collection.id,
    title: collection.title,
    subtitle: collection.description,
    image: collection.imageUrl || 'https://placehold.co/400x300',
    ctaText: 'Entdecken',
    ctaAction: () => handleCollectionPress(collection),
  }));

  // Personality packs data (curated collections)
  const personalityPacks = collections.slice(0, 3).map(collection => ({
    id: collection.id,
    title: collection.title,
    description: collection.description,
    image: collection.imageUrl || 'https://placehold.co/200x200',
    productCount: collection.productCount,
    priceRange: {
      min: 19.99,
      max: 49.99,
    },
    tags: ['personalisiert', 'hochwertig', 'einzigartig'],
    onPress: () => handleCollectionPress(collection),
  }));

  if (loading) {
    return (
      <Box backgroundColor="background" flex={1} justifyContent="center" alignItems="center">
        <Text variant="body">Lade...</Text>
      </Box>
    );
  }

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        onSearchPress={handleSearchPress}
        onCartPress={handleCartPress}
        cartItemCount={cartItemCount}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Hero Carousel for Featured Collections */}
        {heroCarouselData.length > 0 && (
          <HeroCarousel
            slides={heroCarouselData}
            height={300}
            autoPlay={true}
            showPagination={true}
          />
        )}

        {/* Fallback Hero Section if no collections */}
        {heroCarouselData.length === 0 && (
          <HeroSection
            backgroundImage="https://placehold.co/400x200"
            title="Personalisiere dein Haustier"
            subtitle="Einzigartige Accessoires für deinen treuen Begleiter"
            description="Entdecke unsere handgefertigten, personalisierbaren Produkte für Hunde und Katzen."
            primaryCta={{
              text: 'Jetzt entdecken',
              action: () => handleSearchPress(),
            }}
            secondaryCta={{
              text: 'Mehr erfahren',
              action: () => {},
            }}
            height={300}
            textAlign="center"
          />
        )}

        {/* Categories Section */}
        <Box paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Kategorien
          </Text>
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id, category.title)}
              />
            ))}
          </Box>
        </Box>

        {/* Design Collections - Horizontal Product Carousels */}
        {collections.map((collection) => (
          <Box key={collection.id} paddingHorizontal="l" paddingVertical="xl">
            <HorizontalProductCarousel
              title={collection.title}
              products={collection.products.map(mapProductForCarousel)}
              onProductPress={handleProductPress}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
              wishlistedProducts={wishlistItems.map(p => p.id)}
              cartProducts={[]}
            />
          </Box>
        ))}

        {/* Personality Packs Carousel */}
        {personalityPacks.length > 0 && (
          <Box paddingHorizontal="l" paddingVertical="xl">
            <PersonalityPacksCarousel
              title="Personality Packs"
              subtitle="Entdecke Produkte nach deinem Stil"
              packs={personalityPacks}
            />
          </Box>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <Box paddingHorizontal="l" paddingVertical="xl">
            <RecentlyViewed
              title="Kürzlich angesehen"
              products={recentlyViewed.map(product => ({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price.replace(/[^\d.,]/g, '').replace(',', '.')),
                image: product.imageUrl,
                rating: product.rating || 0,
                reviewCount: product.reviewCount || 0,
                isWishlisted: isInWishlist(product.id),
                onPress: () => handleProductPress(product),
                onWishlistToggle: () => handleWishlistToggle(product.id),
                onAddToCart: () => handleAddToCart(product.id),
              }))}
            />
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
