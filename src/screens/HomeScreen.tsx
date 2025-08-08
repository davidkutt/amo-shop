import React from 'react';
import { ScrollView, View } from 'react-native';
import { createRestyleComponent, spacing, SpacingProps, backgroundColor, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Header } from 'components/organisms/Header';
import { HeroSection } from 'components/organisms/HeroSection';
import { HorizontalProductCarousel } from 'components/organisms/HorizontalProductCarousel';
import { PersonalityPacksCarousel } from 'components/organisms/PersonalityPacksCarousel';
import { ShopTheLook } from 'components/organisms/ShopTheLook';
import { NavigationProps } from 'navigation/types';

const HomeContainer = createRestyleComponent<SpacingProps<Theme> & BackgroundColorProps<Theme>>([
  spacing,
  backgroundColor,
]);

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('CategoryProducts', { categoryId, categoryName });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  // Mock data for demonstration
  const featuredProducts = [
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
    {
      id: '2',
      name: 'Custom Pet Bowl',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.8,
      reviewCount: 95,
      isWishlisted: true,
      onPress: () => handleProductPress('2'),
      onWishlistToggle: () => {},
      onAddToCart: () => {},
    },
  ];

  const personalityPacks = [
    {
      id: '1',
      title: 'Adventure Pack',
      description: 'Perfect for active pets',
      image: 'https://via.placeholder.com/300x200',
      productCount: 5,
      priceRange: { min: 49.99, max: 129.99 },
      tags: ['Adventure', 'Outdoor', 'Active'],
      onPress: () => handleCategoryPress('adventure', 'Adventure Pack'),
    },
    {
      id: '2',
      title: 'Luxury Pack',
      description: 'Premium accessories for pampered pets',
      image: 'https://via.placeholder.com/300x200',
      productCount: 4,
      priceRange: { min: 79.99, max: 199.99 },
      tags: ['Luxury', 'Premium', 'Comfort'],
      onPress: () => handleCategoryPress('luxury', 'Luxury Pack'),
    },
  ];

  const lookProducts = [
    {
      id: '1',
      name: 'Personalized Collar',
      price: 29.99,
      image: 'https://via.placeholder.com/100x100',
      rating: 4.5,
      reviewCount: 128,
      isWishlisted: false,
      onPress: () => handleProductPress('1'),
      onWishlistToggle: () => {},
      onAddToCart: () => {},
    },
    {
      id: '2',
      name: 'Matching Bowl',
      price: 24.99,
      image: 'https://via.placeholder.com/100x100',
      rating: 4.8,
      reviewCount: 95,
      isWishlisted: true,
      onPress: () => handleProductPress('2'),
      onWishlistToggle: () => {},
      onAddToCart: () => {},
    },
  ];

  return (
    <HomeContainer backgroundColor="background" flex={1}>
      <Header
        onSearchPress={handleSearchPress}
        onCartPress={handleCartPress}
        cartItemCount={3}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection
          backgroundImage="https://via.placeholder.com/400x200"
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

        <View paddingHorizontal="l" paddingVertical="xl">
          <Text variant="title" marginBottom="m">
            Beliebte Produkte
          </Text>
          <HorizontalProductCarousel
            title="Trending"
            products={featuredProducts}
            onViewAll={() => handleSearchPress()}
          />
        </View>

        <View paddingHorizontal="l" paddingVertical="xl">
          <PersonalityPacksCarousel
            title="Personality Packs"
            subtitle="Kuratiert für verschiedene Persönlichkeiten"
            packs={personalityPacks}
            onViewAll={() => handleSearchPress()}
          />
        </View>

        <View paddingHorizontal="l" paddingVertical="xl">
          <ShopTheLook
            title="Shop the Look"
            subtitle="Komplette Outfits für dein Haustier"
            description="Entdecke perfekt abgestimmte Sets"
            lookImage="https://via.placeholder.com/400x300"
            products={lookProducts}
            totalPrice={54.98}
            onAddAllToCart={() => {}}
            onViewLook={() => {}}
            onViewAll={() => handleSearchPress()}
          />
        </View>
      </ScrollView>
    </HomeContainer>
  );
};

export default HomeScreen;
