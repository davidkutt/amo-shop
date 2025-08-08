import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { SearchBar } from 'components/molecules/SearchBar';
import { FilterBar } from 'components/organisms/FilterBar';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { NavigationProps } from 'navigation/types';

const SearchContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const SearchScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('');

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Mock data
  const filters = [
    { id: 'category', label: 'Kategorie', value: 'category' },
    { id: 'price', label: 'Preis', value: 'price' },
    { id: 'color', label: 'Farbe', value: 'color' },
    { id: 'size', label: 'Größe', value: 'size' },
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevanz', value: 'relevance' },
    { id: 'price-low', label: 'Preis: Niedrig zu Hoch', value: 'price-low' },
    { id: 'price-high', label: 'Preis: Hoch zu Niedrig', value: 'price-high' },
    { id: 'newest', label: 'Neueste', value: 'newest' },
  ];

  const searchResults = [
    {
      id: '1',
      name: 'Personalized Pet Collar',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.5,
      reviewCount: 128,
      isWishlisted: false,
      onPress: () => handleProductPress('1'),
      onWishlistToggle: () => {},
      onAddToCart: () => {},
    },
  ];

  return (
    <SearchContainer backgroundColor="background" flex={1}>
      <Header
        back
        title="Suche"
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal="l" paddingVertical="m">
          <SearchBar
            placeholder="Nach Produkten suchen..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={() => {}}
            onClear={() => setSearchQuery('')}
          />
        </View>

        <View paddingHorizontal="l" paddingVertical="m">
          <FilterBar
            filters={filters}
            sortOptions={sortOptions}
            selectedFilters={selectedFilters}
            selectedSort={selectedSort}
            onFilterChange={setSelectedFilters}
            onSortChange={setSelectedSort}
          />
        </View>

        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Suchergebnisse
          </Text>
          <HorizontalProductCarousel
            title="Gefunden"
            products={searchResults}
            onViewAll={() => {}}
          />
        </View>
      </ScrollView>
    </SearchContainer>
  );
};

export default SearchScreen;
