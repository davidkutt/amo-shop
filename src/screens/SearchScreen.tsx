import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, FlatList, RefreshControl } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { SearchBar } from 'components/molecules/SearchBar';
import FilterBar from 'components/organisms/FilterBar';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { CategoryCard } from 'components/organisms/CategoryCard';
import { ProductCard } from 'components/organisms/ProductCard';
import { NavigationProps } from 'navigation/types';
import { 
  ShopifyService, 
  RecentlyViewedService, 
  WishlistService,
  CartService,
  Product,
  ProductCategory,
  SearchParams,
  SortOption,
  PaginatedResponse
} from '../services';

const Box = createBox<Theme>();

const SearchScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Get initial filters from route params
  const initialFilters = route?.params?.initialFilters;
  const initialTitle = route?.params?.initialTitle;

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // Apply initial filters if provided
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.collection) {
        setSelectedFilters([initialFilters.collection]);
      }
      if (initialFilters.category) {
        setSelectedFilters(prev => [...prev, initialFilters.category]);
      }
    }
  }, [initialFilters]);

  const loadInitialData = async () => {
    try {
      // Load wishlist status
      const wishlistData = await WishlistService.getWishlist();
      setWishlistedProducts(wishlistData.map((p: Product) => p.id));
      
      // Load cart item count
      const cartCount = await CartService.getCartItemCount();
      setCartItemCount(cartCount);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const handleProductPress = async (product: Product) => {
    // Add to recently viewed
    await RecentlyViewedService.addProduct(product);
    
    // Navigate to product detail
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('CategoryProducts', { categoryId, categoryName });
  };

  const handleWishlistToggle = async (productId: string) => {
    try {
      const isInWishlist = await WishlistService.isInWishlist(productId);
      
      if (isInWishlist) {
        await WishlistService.removeFromWishlist(productId);
        setWishlistedProducts(prev => prev.filter(id => id !== productId));
      } else {
        // Find the product in search results to add to wishlist
        const product = searchResults.find(p => p.id === productId);
        
        if (product) {
          await WishlistService.addToWishlist(product);
          setWishlistedProducts(prev => [...prev, productId]);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      // Find the product
      const product = searchResults.find(p => p.id === productId);
      
      if (product) {
        await CartService.addToCart({
          product,
          quantity: 1,
        });
        
        // Update cart count
        const newCount = await CartService.getCartItemCount();
        setCartItemCount(newCount);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Debounced search function
  const performSearch = useCallback(async (query: string, filters: string[], sort: SortOption) => {
    try {
      setLoading(true);
      
      const searchParams: SearchParams = {
        query: query.trim() || undefined,
        filters: {
          category: filters.find(f => ['dog-collar', 'clip-on-bandana', 'clip-on-collar', 'collar-bandana', 'feeding mat', 'bowl', 'tag'].includes(f)) as ProductCategory,
          collection: filters.find(f => !['dog-collar', 'clip-on-bandana', 'clip-on-collar', 'collar-bandana', 'feeding mat', 'bowl', 'tag'].includes(f)),
        },
        sort,
        first: 50,
      };

      const response: PaginatedResponse<Product> = await ShopifyService.searchProducts(searchParams);
      setSearchResults(response.items);
      setHasSearched(true);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery || selectedFilters.length > 0) {
        performSearch(searchQuery, selectedFilters, selectedSort);
      } else {
        setSearchResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedFilters, selectedSort, performSearch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await performSearch(searchQuery, selectedFilters, selectedSort);
    setRefreshing(false);
  };

  // Filter and sort options following PRD specifications
  const filters = [
    { id: 'dog-collar', label: 'Halsbänder', value: 'dog-collar' },
    { id: 'clip-on-bandana', label: 'Bandanas', value: 'clip-on-bandana' },
    { id: 'clip-on-collar', label: 'Clip-on Halsbänder', value: 'clip-on-collar' },
    { id: 'collar-bandana', label: 'Halsband-Bandanas', value: 'collar-bandana' },
    { id: 'feeding mat', label: 'Futtermatten', value: 'feeding mat' },
    { id: 'bowl', label: 'Näpfe', value: 'bowl' },
    { id: 'tag', label: 'Tags', value: 'tag' },
  ];

  const sortOptions = [
    { id: 'newest', label: 'Neueste', value: 'newest' },
    { id: 'price-low-to-high', label: 'Preis: Niedrig zu Hoch', value: 'price-low-to-high' },
    { id: 'price-high-to-low', label: 'Preis: Hoch zu Niedrig', value: 'price-high-to-low' },
    { id: 'name-a-to-z', label: 'Name: A bis Z', value: 'name-a-to-z' },
    { id: 'name-z-to-a', label: 'Name: Z bis A', value: 'name-z-to-a' },
  ];

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
    {
      id: 'tag' as ProductCategory,
      title: 'Tags',
      image: { uri: 'https://placehold.co/300x200' },
    },
  ];

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

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        back
        title={initialTitle || "Suche"}
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={cartItemCount}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Box paddingHorizontal="l" paddingVertical="m">
          <SearchBar
            placeholder="Nach Produkten suchen..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={() => performSearch(searchQuery, selectedFilters, selectedSort)}
            onClear={() => setSearchQuery('')}
          />
        </Box>

        <Box paddingHorizontal="l" paddingVertical="m">
          <FilterBar
            filters={filters}
            sortOptions={sortOptions}
            selectedFilters={selectedFilters}
            selectedSort={selectedSort}
            onFilterChange={setSelectedFilters}
            onSortChange={(sortId: string) => setSelectedSort(sortId as SortOption)}
          />
        </Box>

        {/* Loading State */}
        {loading && (
          <Box paddingHorizontal="l" paddingVertical="xl" alignItems="center">
            <Text variant="body">Suche...</Text>
          </Box>
        )}

        {/* Search Results */}
        {hasSearched && !loading && (
          <Box paddingHorizontal="l" paddingVertical="xl">
            <Text variant="title" marginBottom="m">
              Suchergebnisse ({searchResults.length})
            </Text>
            
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                numColumns={2}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                  <Box width="48%" marginBottom="m">
                    <ProductCard
                      product={{
                        id: item.id,
                        handle: item.handle,
                        variantId: item.variantId,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageUrl,
                        rating: item.rating || 0,
                        reviewCount: item.reviewCount || 0,
                      }}
                      isWishlisted={wishlistedProducts.includes(item.id)}
                      onPress={() => handleProductPress(item)}
                      onWishlistToggle={() => handleWishlistToggle(item.id)}
                      onAddToCart={() => handleAddToCart(item.id)}
                    />
                  </Box>
                )}
              />
            ) : (
              <Box alignItems="center" paddingVertical="xl">
                <Text variant="body" textAlign="center">
                  Keine Produkte gefunden. Versuche andere Suchbegriffe oder Filter.
                </Text>
              </Box>
            )}
          </Box>
        )}

        {/* Categories Grid - Show when no search is active */}
        {!hasSearched && !loading && (
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
        )}
      </ScrollView>
    </Box>
  );
};

export default SearchScreen;
