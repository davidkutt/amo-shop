import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import theme from 'theme/index';

// Import atomic components
import { Text, Button, Input, Icon } from 'components/atoms';

// Import molecular components
import { 
  Badge, 
  Breadcrumbs, 
  CartItem, 
  Checkbox, 
  Chip, 
  ColorSelector,
  Counter, 
  Disclosure,
  FilterButton,
  FormField,
  RatingDisplay, 
  SearchBar,
  Switch,
  TextInputField
} from 'components/molecules';

// Import organism components
import { 
  Header, 
  ProductCard, 
  CategoryCard, 
  HorizontalProductCarousel,
  HeroCarousel,
  HeroSection,
  FilterBar,
  PersonalityPacksCarousel,
  RecentlyViewed,
  ShopTheLook,
  Tabbar
} from 'components/organisms';

const ComponentShowcaseScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>(['1']);
  const [cartProducts, setCartProducts] = useState<string[]>(['2']);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [counterValue, setCounterValue] = useState(1);
  const [ratingValue, setRatingValue] = useState(4.5);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleChipPress = (chipText: string) => {
    setSelectedChip(selectedChip === chipText ? null : chipText);
  };

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string) => {
    setCartProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Mock data for organism components
  const mockProducts = [
    {
      id: '1',
      handle: 'product-1',
      variantId: 'variant-1',
      name: 'Cosmic Paws Halsband',
      price: '84.90 EUR',
      imageUrl: 'https://via.placeholder.com/200x200/93c5fd/ffffff?text=Product+1',
      rating: 4.5,
      reviewCount: 12,
    },
    {
      id: '2',
      handle: 'product-2',
      variantId: 'variant-2',
      name: 'Galaxy Bandana für Hunde',
      price: '29.90 EUR',
      imageUrl: 'https://via.placeholder.com/200x200/f9a8d4/ffffff?text=Product+2',
      rating: 4.8,
      reviewCount: 8,
    },
    {
      id: '3',
      handle: 'product-3',
      variantId: 'variant-3',
      name: 'Sternenlicht Hundemarke',
      price: '19.90 EUR',
      imageUrl: 'https://via.placeholder.com/200x200/5eead4/ffffff?text=Product+3',
      rating: 4.2,
      reviewCount: 15,
    },
  ];

  const mockCategories = [
    {
      id: 'collars',
      title: 'Halsbänder',
      image: { uri: 'https://via.placeholder.com/160x120/93c5fd/ffffff?text=Collars' },
    },
    {
      id: 'bandanas',
      title: 'Bandanas',
      image: { uri: 'https://via.placeholder.com/160x120/f9a8d4/ffffff?text=Bandanas' },
    },
    {
      id: 'tags',
      title: 'Marken',
      image: { uri: 'https://via.placeholder.com/160x120/5eead4/ffffff?text=Tags' },
    },
  ];

  const mockCartItems = [
    {
      imageUrl: 'https://via.placeholder.com/60x60/93c5fd/ffffff?text=Item+1',
      name: 'Cosmic Paws Halsband',
      price: '84.90 EUR',
      quantity: 2,
    },
    {
      imageUrl: 'https://via.placeholder.com/60x60/f9a8d4/ffffff?text=Item+2',
      name: 'Galaxy Bandana für Hunde',
      price: '29.90 EUR',
      quantity: 1,
    },
  ];

  const mockBreadcrumbs = [
    { label: 'Start', onPress: () => console.log('Start pressed') },
    { label: 'Kategorien', onPress: () => console.log('Categories pressed') },
    { label: 'Halsbänder', onPress: () => console.log('Collars pressed') },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}
        contentContainerStyle={{ padding: theme.spacing.l }}
      >
        <Text variant="title" marginBottom="xl">
          Component Showcase
        </Text>

        {/* Atomic Components Section */}
        <Text variant="subtitle" marginBottom="l">
          Atomic Components
        </Text>

        {/* Text Component */}
        <View marginBottom="l">
          <Text variant="body" marginBottom="s">
            Text Component Variants:
          </Text>
          <Text variant="title" marginBottom="s">Title Text</Text>
          <Text variant="subtitle" marginBottom="s">Subtitle Text</Text>
          <Text variant="body" marginBottom="s">Body Text</Text>
          <Text variant="small" marginBottom="s">Small Text</Text>
          <Text variant="caption">Caption Text</Text>
        </View>

        {/* Button Component */}
        <View marginBottom="l">
          <Text variant="body" marginBottom="s">
            Button Component Variants:
          </Text>
          <Button
            title="Primary Button"
            variant="primary"
            onPress={() => console.log('Primary pressed')}
            marginBottom="s"
          />
          <Button
            title="Outline Button"
            variant="outline"
            onPress={() => console.log('Outline pressed')}
            marginBottom="s"
          />
          <Button
            title="Text Button"
            variant="text"
            onPress={() => console.log('Text pressed')}
            marginBottom="s"
          />
          <Button
            title="Loading Button"
            loading={true}
            onPress={() => console.log('Loading pressed')}
            marginBottom="s"
          />
          <Button
            title="Disabled Button"
            disabled={true}
            onPress={() => console.log('Disabled pressed')}
          />
        </View>

        {/* Input Component */}
        <View marginBottom="l">
          <Text variant="body" marginBottom="s">
            Input Component:
          </Text>
          <Input
            placeholder="Default input"
            marginBottom="s"
          />
          <Input
            placeholder="Error input"
            variant="error"
            marginBottom="s"
          />
        </View>

        {/* Icon Component */}
        <View marginBottom="l">
          <Text variant="body" marginBottom="s">
            Icon Component:
          </Text>
          <View flexDirection="row" alignItems="center" marginBottom="s">
            <Icon name="heart" size={24} color="accent2" marginRight="s" />
            <Icon name="cart" size={24} color="primary" marginRight="s" />
            <Icon name="search" size={24} color="textPrimary" marginRight="s" />
            <Icon name="user" size={24} color="textSecondary" />
          </View>
        </View>

        {/* Molecular Components Section */}
        <Text variant="subtitle" marginBottom="l">
          Molecular Components
        </Text>

        {/* Badge Component */}
        <View marginBottom="l">
          <Text variant="body" marginBottom="s">
            Badge Component:
          </Text>
          <View flexDirection="row" alignItems="center" marginBottom="s">
            <Badge content={5} marginRight="m">
              <Icon name="bell" size={32} color="textPrimary" />
            </Badge>
            <Badge content={150} max={99} marginRight="m">
              <Icon name="mail" size={32} color="textPrimary" />
            </Badge>
            <Badge variant="dot">
              <Icon name="user" size={32} color="textPrimary" />
            </Badge>
          </View>
        </View>

        {/* Chip Component */}
        <View marginBottom="l">
          <Text variant="body" marginBottom="s">
            Chip Component:
          </Text>
          <View flexDirection="row" flexWrap="wrap" marginBottom="s">
            <Chip
              onPress={() => handleChipPress('Category A')}
              selected={selectedChip === 'Category A'}
              marginRight="s"
              marginBottom="s"
            >
              Category A
            </Chip>
            <Chip
              onPress={() => handleChipPress('Category B')}
              selected={selectedChip === 'Category B'}
              marginRight="s"
              marginBottom="s"
            >
              Category B
            </Chip>
            <Chip
              onPress={() => handleChipPress('Category C')}
              selected={selectedChip === 'Category C'}
              marginRight="s"
              marginBottom="s"
            >
              Category C
            </Chip>
          </View>
          <View flexDirection="row" flexWrap="wrap">
            <Chip
              onPress={() => handleChipPress('Small')}
              size="sm"
              marginRight="s"
              marginBottom="s"
            >
              Small
            </Chip>
            <Chip
              onPress={() => handleChipPress('With Icon')}
              slotPrefix={<Icon name="star" size={12} color="textPrimary" />}
              marginRight="s"
              marginBottom="s"
            >
              With Icon
            </Chip>
          </View>
        </View>

                 {/* Breadcrumbs Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             Breadcrumbs Component:
           </Text>
           <Breadcrumbs
             crumbs={mockBreadcrumbs}
             marginBottom="s"
           />
         </View>

         {/* CartItem Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             CartItem Component:
           </Text>
           {mockCartItems.map((item, index) => (
             <CartItem
               key={index}
               item={item}
               onRemove={() => console.log('Remove item:', index)}
               onQuantityChange={(quantity) => console.log('Quantity changed:', quantity)}
               marginBottom="s"
             />
           ))}
         </View>

         {/* Checkbox Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             Checkbox Component:
           </Text>
           <Checkbox
             value={checkboxValue}
             onValueChange={setCheckboxValue}
             label="Ich stimme den AGB zu"
             marginBottom="s"
           />
           <Checkbox
             value={false}
             onValueChange={() => {}}
             label="Invalid checkbox"
             invalid={true}
           />
         </View>

         {/* Counter Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             Counter Component:
           </Text>
           <Counter
             value={counterValue}
             onValueChange={setCounterValue}
             label="Anzahl"
             min={1}
             max={10}
             marginBottom="s"
           />
         </View>

         {/* RatingDisplay Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             RatingDisplay Component:
           </Text>
           <RatingDisplay
             rating={ratingValue}
             showValue={true}
             marginBottom="s"
           />
           <RatingDisplay
             rating={3.5}
             size="lg"
             interactive={true}
             onRatingChange={(rating) => console.log('Rating changed:', rating)}
           />
         </View>

         {/* SearchBar Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             SearchBar Component:
           </Text>
           <SearchBar
             placeholder="Suchen nach Produkten..."
             value={searchText}
             onChangeText={setSearchText}
             onSearch={handleSearch}
             marginBottom="s"
           />
         </View>

         {/* ColorSelector Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             ColorSelector Component:
           </Text>
           <ColorSelector
             colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
             selectedColor="#4ECDC4"
             onColorSelect={(color) => console.log('Color selected:', color)}
             marginBottom="s"
           />
           <ColorSelector
             colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
             size="sm"
             showLabels={true}
             marginBottom="s"
           />
         </View>

         {/* Disclosure Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             Disclosure Component:
           </Text>
           <Disclosure
             title="Produktdetails"
             defaultOpen={true}
             marginBottom="s"
           >
             <Text variant="body" color="textSecondary">
               Hier sind die detaillierten Informationen über das Produkt.
             </Text>
           </Disclosure>
           <Disclosure
             title="Versandinformationen"
             variant="bordered"
             marginBottom="s"
           >
             <Text variant="body" color="textSecondary">
               Kostenloser Versand ab 50€ Bestellwert.
             </Text>
           </Disclosure>
         </View>

         {/* FilterButton Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             FilterButton Component:
           </Text>
           <View flexDirection="row" flexWrap="wrap" marginBottom="s">
             <FilterButton
               label="Preis: Niedrig zu Hoch"
               onPress={() => console.log('Sort by price low to high')}
               marginRight="s"
               marginBottom="s"
             />
             <FilterButton
               label="Bewertung"
               onPress={() => console.log('Sort by rating')}
               active={true}
               marginRight="s"
               marginBottom="s"
             />
             <FilterButton
               label="Filter"
               onPress={() => console.log('Open filters')}
               icon="filter"
               iconPosition="left"
               marginRight="s"
               marginBottom="s"
             />
           </View>
         </View>

         {/* FormField Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             FormField Component:
           </Text>
           <FormField
             label="E-Mail Adresse"
             required={true}
             error="Bitte geben Sie eine gültige E-Mail-Adresse ein"
             marginBottom="s"
           >
             <Input placeholder="ihre.email@beispiel.de" />
           </FormField>
           <FormField
             label="Passwort"
             required={true}
             marginBottom="s"
           >
             <Input placeholder="Ihr Passwort" secureTextEntry={true} />
           </FormField>
         </View>

         {/* Switch Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             Switch Component:
           </Text>
           <Switch
             value={true}
             onValueChange={(value) => console.log('Switch value:', value)}
             label="E-Mail Benachrichtigungen"
             marginBottom="s"
           />
           <Switch
             value={false}
             onValueChange={(value) => console.log('Switch value:', value)}
             label="Push-Benachrichtigungen"
             marginBottom="s"
           />
           <Switch
             value={true}
             onValueChange={(value) => console.log('Switch value:', value)}
             label="Disabled Switch"
             disabled={true}
           />
         </View>

         {/* TextInputField Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             TextInputField Component:
           </Text>
           <TextInputField
             value=""
             onChangeText={(text) => console.log('Text changed:', text)}
             placeholder="Suchen Sie nach Produkten..."
             leftIcon="search"
             marginBottom="s"
           />
           <TextInputField
             value=""
             onChangeText={(text) => console.log('Text changed:', text)}
             placeholder="Ihr Passwort"
             label="Passwort"
             required={true}
             secureTextEntry={true}
             marginBottom="s"
           />
           <TextInputField
             value=""
             onChangeText={(text) => console.log('Text changed:', text)}
             placeholder="Ihre Nachricht"
             label="Nachricht"
             multiline={true}
             numberOfLines={3}
             variant="filled"
           />
         </View>

        {/* Theme Colors Showcase */}
        <Text variant="subtitle" marginBottom="l">
          Theme Colors
        </Text>
        <View flexDirection="row" flexWrap="wrap" marginBottom="l">
          <View
            backgroundColor="primary"
            width={60}
            height={60}
            borderRadius="m"
            marginRight="s"
            marginBottom="s"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="caption" color="white">Primary</Text>
          </View>
          <View
            backgroundColor="accent1"
            width={60}
            height={60}
            borderRadius="m"
            marginRight="s"
            marginBottom="s"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="caption" color="textPrimary">Accent1</Text>
          </View>
          <View
            backgroundColor="accent2"
            width={60}
            height={60}
            borderRadius="m"
            marginRight="s"
            marginBottom="s"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="caption" color="white">Accent2</Text>
          </View>
          <View
            backgroundColor="accent3"
            width={60}
            height={60}
            borderRadius="m"
            marginRight="s"
            marginBottom="s"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="caption" color="textPrimary">Accent3</Text>
          </View>
          <View
            backgroundColor="accent4"
            width={60}
            height={60}
            borderRadius="m"
            marginRight="s"
            marginBottom="s"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="caption" color="textPrimary">Accent4</Text>
          </View>
        </View>

        {/* Spacing Showcase */}
        <Text variant="subtitle" marginBottom="l">
          Spacing Scale
        </Text>
        <View marginBottom="l">
          <View
            backgroundColor="primary"
            height={4}
            marginBottom="xs"
            borderRadius="xs"
          />
          <View
            backgroundColor="primary"
            height={8}
            marginBottom="s"
            borderRadius="xs"
          />
          <View
            backgroundColor="primary"
            height={16}
            marginBottom="m"
            borderRadius="xs"
          />
          <View
            backgroundColor="primary"
            height={24}
            marginBottom="l"
            borderRadius="xs"
          />
          <View
            backgroundColor="primary"
            height={32}
            marginBottom="xl"
            borderRadius="xs"
          />
        </View>

                 {/* Organism Components Section */}
         <Text variant="subtitle" marginBottom="l">
           Organism Components
         </Text>

         {/* Header Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             Header Component:
           </Text>
           <Header
             title="Herzenshund"
             cartItemCount={cartItemCount}
             onBackPress={() => console.log('Back pressed')}
             onSearchPress={() => console.log('Search pressed')}
             onCartPress={() => console.log('Cart pressed')}
             marginBottom="s"
           />
         </View>

         {/* ProductCard Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             ProductCard Component:
           </Text>
           <View flexDirection="row" flexWrap="wrap">
             {mockProducts.slice(0, 2).map((product) => (
               <ProductCard
                 key={product.id}
                 product={product}
                 onPress={() => console.log('Product pressed:', product.id)}
                 onWishlistToggle={() => handleWishlistToggle(product.id)}
                 onAddToCart={() => handleAddToCart(product.id)}
                 isWishlisted={wishlistedProducts.includes(product.id)}
                 isInCart={cartProducts.includes(product.id)}
                 marginBottom="s"
               />
             ))}
           </View>
         </View>

         {/* CategoryCard Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             CategoryCard Component:
           </Text>
           <View flexDirection="row" flexWrap="wrap">
             {mockCategories.map((category) => (
               <CategoryCard
                 key={category.id}
                 category={category}
                 onPress={(categoryId) => console.log('Category pressed:', categoryId)}
               />
             ))}
           </View>
         </View>

         {/* HorizontalProductCarousel Component */}
         <View marginBottom="l">
           <Text variant="body" marginBottom="s">
             HorizontalProductCarousel Component:
           </Text>
           <HorizontalProductCarousel
             title="Empfohlene Produkte"
             products={mockProducts}
             onProductPress={(product) => console.log('Product pressed:', product.id)}
             onWishlistToggle={handleWishlistToggle}
             onAddToCart={handleAddToCart}
             wishlistedProducts={wishlistedProducts}
             cartProducts={cartProducts}
           />
         </View>

         <View height={100} />
       </ScrollView>
     </ThemeProvider>
   );
 };

export default ComponentShowcaseScreen;
