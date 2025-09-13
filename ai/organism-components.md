# Organism Components

Organism components are complex UI components that combine multiple molecules and atoms to create functional sections of the application. They represent the highest level of component complexity in the atomic design system.

## Header

**Purpose**: A dynamic header component that shrinks and hides the logo when scrolling, providing navigation functionality while optimizing content space.

**Key Features**:
- Animated height reduction on scroll (80px to 60px)
- Logo fade-out animation on scroll
- Navigation elements with back button or search icon
- Shopping cart navigation
- Responsive to scroll position using `useScroll` context

**Props**:
```typescript
interface HeaderProps {
  back?: boolean; // Shows back button instead of search icon
}
```

**Usage**:
```tsx
<Header back={true} />
```

## HeroCarousel

**Purpose**: A beautiful, full-width, swipeable carousel to showcase featured collections with auto-play functionality.

**Key Features**:
- Full-screen width carousel (60% of screen height)
- Auto-play with 4-second intervals
- Pagination dots
- Touch interaction for slide navigation
- Responsive design

**Props**:
```typescript
type HeroCarouselProps = {
  slides: Slide[];
  onSlidePress: (slideId: string) => void;
};

type Slide = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  badge?: string;
};
```

**Usage**:
```tsx
<HeroCarousel 
  slides={featuredSlides} 
  onSlidePress={(slideId) => navigation.navigate('Collection', { id: slideId })} 
/>
```

## HeroSection

**Purpose**: A static hero section to welcome users with animated content and time-based greetings.

**Key Features**:
- Spring animation for image scaling
- Time-based greeting messages (Guten Morgen/Guten Abend)
- Dynamic background colors
- Large, playful rounded corners with shadows

**Props**:
```typescript
type HeroSectionProps = {
  title: string;
  image: ImageSourcePropType;
  backgroundColor: string; // e.g., 'bg-yellow-300'
};
```

**Usage**:
```tsx
<HeroSection 
  title="Welcome to Herzenshund"
  image={require('../assets/welcome-image.jpg')}
  backgroundColor="bg-yellow-300"
/>
```

## ProductCard

**Purpose**: A product card redesigned in "Joyful Design System" style with wishlist and cart functionality.

**Key Features**:
- German locale price formatting (comma decimal separator)
- Wishlist toggle functionality
- Add to cart functionality
- High-fidelity image display
- Joyful typography with rounded fonts
- Touch interactions for product details

**Props**:
```typescript
interface ProductCardProps {
  product: Product;
  onPress: () => void;
  className?: string;
}

interface Product {
  id: string;
  handle: string;
  variantId: string;
  name: string;
  price: string; // e.g., "84.90 EUR"
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}
```

**Usage**:
```tsx
<ProductCard 
  product={productData}
  onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
  className="w-[200px] mx-2"
/>
```

## CategoryCard

**Purpose**: A reusable, pressable card with background image and title to represent product categories.

**Key Features**:
- 4:3 aspect ratio for visual appeal
- Semi-transparent text overlay
- Background image with cover resize mode
- Touch interaction for category navigation

**Props**:
```typescript
type CategoryCardProps = {
  category: Category;
  onPress: (categoryId: string) => void;
};

type Category = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};
```

**Usage**:
```tsx
<CategoryCard 
  category={categoryData}
  onPress={(categoryId) => navigation.navigate('Category', { id: categoryId })}
/>
```

## FilterBar

**Purpose**: A bar component for filtering products with a warm, elegant aesthetic.

**Key Features**:
- Product count display with Counter molecule
- Filter and sort buttons
- Navigation to filter screen
- Clean, minimal design with subtle borders

**Props**:
```typescript
interface FilterBarProps {
  productCount: number;
}
```

**Usage**:
```tsx
<FilterBar productCount={42} />
```

## HorizontalProductCarousel

**Purpose**: A horizontally scrolling carousel to display a list of products with navigation.

**Key Features**:
- Horizontal FlatList with ProductCard components
- Section title with elegant typography
- Navigation to product detail screens
- Responsive spacing and padding

**Props**:
```typescript
interface HorizontalProductCarouselProps {
  title: string;
  products: Product[];
}
```

**Usage**:
```tsx
<HorizontalProductCarousel 
  title="Featured Products"
  products={featuredProducts}
/>
```

## PersonalityPacksCarousel

**Purpose**: A horizontal carousel of playful cards for shopping by "vibe" or personality.

**Key Features**:
- Colorful personality cards with icons
- Shopify collection handle navigation
- Rounded design with active opacity
- Horizontal scrolling with proper spacing

**Props**:
```typescript
type PersonalityPacksCarouselProps = {
  title: string;
  packs: PersonalityPack[];
  onPackPress: (handle: string) => void;
};

type PersonalityPack = {
  id: string;
  title: string;
  iconName: IconName;
  color: string;
  handle: string;
};
```

**Usage**:
```tsx
<PersonalityPacksCarousel 
  title="Shop by Personality"
  packs={personalityPacks}
  onPackPress={(handle) => navigation.navigate('Collection', { handle })}
/>
```

## RecentlyViewed

**Purpose**: A horizontally scrolling carousel to display recently viewed products.

**Key Features**:
- Similar to HorizontalProductCarousel but for recently viewed items
- Navigation to product detail screens
- Clean section title
- Horizontal scrolling with ProductCard components

**Props**:
```typescript
interface RecentlyViewedProps {
  title: string;
  products: Product[];
}
```

**Usage**:
```tsx
<RecentlyViewed 
  title="Recently Viewed"
  products={recentlyViewedProducts}
/>
```

## ShopTheLook

**Purpose**: A component to showcase curated looks with call-to-action buttons.

**Key Features**:
- Image display with 4:3 aspect ratio
- Title and description text
- Primary call-to-action button
- Rounded design with background styling

**Props**:
```typescript
type ShopTheLookProps = {
  look: Look;
  onPress: (collectionHandle: string) => void;
};

type Look = {
  collectionHandle: string;
  title: string;
  imageUrl: string;
  description: string;
};
```

**Usage**:
```tsx
<ShopTheLook 
  look={lookData}
  onPress={(handle) => navigation.navigate('Collection', { handle })}
/>
```

## Tabbar

**Purpose**: A custom tabbar component with a clean, classic design for bottom navigation.

**Key Features**:
- Safe area insets support
- Icon and text labels for each tab
- Active/inactive state styling
- Navigation integration with React Navigation
- Clean background with subtle borders

**Props**: Uses React Navigation's tab navigator props automatically.

**Usage**: Automatically used by React Navigation's bottom tab navigator.

## Design System Integration

All organism components follow the "Joyful Design System":

- **Colors**: Use design system colors (`text-text`, `background`, `primary`)
- **Typography**: Joyful rounded fonts for titles, clean sans-serif for body text
- **Spacing**: Consistent padding and margins using Tailwind classes
- **Animations**: Smooth spring animations for enhanced user experience
- **Accessibility**: Proper accessibility labels and roles

## Context Dependencies

Several organism components depend on React Context:

- **Header**: Uses `useScroll` context for scroll-based animations
- **ProductCard**: Uses `useWishlist` and `useCart` contexts for state management
- **Tabbar**: Integrates with React Navigation context

## Performance Considerations

- **HeroCarousel**: Uses `react-native-reanimated-carousel` for smooth performance
- **HorizontalProductCarousel**: Implements proper `keyExtractor` for FlatList optimization
- **ProductCard**: Efficient image loading with proper resize modes
- **Header**: Optimized animations using `react-native-reanimated`
