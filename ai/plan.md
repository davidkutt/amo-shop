# Herzenshund Implementation Plan

This plan outlines the steps for building the "Herzenshund" React Native application. The approach is to first build a comprehensive e-commerce UI library using Shopify Restyle, then build the full application using these components.

---

## **Phase 1: E-commerce UI Library Foundation**

* **Goal:** Build a complete, reusable e-commerce UI library using Shopify Restyle with all atomic, molecular, and organism components.
* **Steps/Tasks:**
    * - [ ] **1.1. Project Setup & Restyle Configuration:**
        * - [x] Set up a new React Native project with Shopify Restyle
        * - [x] Configure Restyle theme with the exact color palette and typography from `prd.md`
        * - [x] Set up proper import path aliases (components/, services/, etc.)
        * - [x] Install and configure React Navigation
        * - [x] Set up state management (Zustand)
    * - [ ] **1.2. Atomic Components (Atoms):**
        * - [x] `components/atoms/Button` - Fully rounded button with variants (primary, outline, text)
        * - [x] `components/atoms/Icon` - SVG icon component with size, color, and fill controls
        * - [x] `components/atoms/Input` - Text input with default/error states
        * - [x] `components/atoms/Text` - Typography component with variants (title, subtitle, body, small)
    * - [ ] **1.3. Molecular Components (Molecules):**
        * - [x] `components/molecules/Badge` - Notification/count indicators
        * - [x] `components/molecules/Breadcrumbs` - Navigation breadcrumbs
        * - [x] `components/molecules/CartItem` - Single cart item display
        * - [x] `components/molecules/Checkbox` - Form checkbox component
        * - [x] `components/molecules/Chip` - Compact label/filter element
        * - [x] `components/molecules/ColorSelector` - Color selection interface
        * - [x] `components/molecules/Counter` - Number display component
        * - [x] `components/molecules/Disclosure` - Expandable content component
        * - [x] `components/molecules/FilterButton` - Filter/sort button
        * - [x] `components/molecules/FormField` - Form field wrapper
        * - [x] `components/molecules/RatingDisplay` - Star rating component
        * - [x] `components/molecules/SearchBar` - Search input component
        * - [x] `components/molecules/Switch` - Toggle switch component
        * - [x] `components/molecules/TextInputField` - Enhanced text input
    * - [ ] **1.4. Organism Components (Organisms):**
        * - [ ] `components/organisms/Header` - Dynamic header with scroll animations
        * - [ ] `components/organisms/HeroCarousel` - Full-width auto-playing carousel
        * - [ ] `components/organisms/HeroSection` - Static welcome section
        * - [ ] `components/organisms/ProductCard` - Product display with wishlist/cart
        * - [ ] `components/organisms/CategoryCard` - Category navigation cards
        * - [ ] `components/organisms/FilterBar` - Product filtering interface
        * - [ ] `components/organisms/HorizontalProductCarousel` - Horizontal product scrolling
        * - [ ] `components/organisms/PersonalityPacksCarousel` - Personality-based shopping
        * - [ ] `components/organisms/RecentlyViewed` - Recently viewed products
        * - [ ] `components/organisms/ShopTheLook` - Curated look showcase
        * - [ ] `components/organisms/Tabbar` - Bottom navigation component
    * - [ ] **1.5. Theme & Design System:**
        * - [ ] Create comprehensive Restyle theme with all colors, typography, spacing
        * - [ ] Implement "Warm & Elegant Minimalism" design system
        * - [ ] Add animation utilities and haptic feedback
        * - [ ] Create accessibility helpers and utilities

---

## **Phase 2: Core Application Structure**

* **Goal:** Build the main application structure using the UI library components.
* **Steps/Tasks:**
    * - [ ] **2.1. Navigation Setup:**
        * - [ ] Implement main Tab Navigator with German labels
        * - [ ] Create placeholder screens for each tab (Start, Suche, Merkliste, Profil)
        * - [ ] Set up stack navigators for each tab
    * - [ ] **2.2. Shopify API Integration:**
        * - [ ] Set up Shopify Storefront API client (GraphQL)
        * - [ ] Create environment configuration for API credentials
        * - [ ] Implement basic shop information fetching
    * - [ ] **2.3. Context & State Management:**
        * - [ ] Create `context/ScrollContext` for scroll-based animations
        * - [ ] Create `context/WishlistContext` for wishlist state
        * - [ ] Create `context/CartContext` for shopping cart state
        * - [ ] Set up local storage service for persistence

---

## **Phase 3: Product Discovery Implementation**

* **Goal:** Implement product discovery features using the UI library components.
* **Steps/Tasks:**
    * - [ ] **3.1. Shopify Data Layer:**
        * - [ ] Implement GraphQL queries for Design Collections
        * - [ ] Create product fetching by collection
        * - [ ] Set up product category filtering
    * - [ ] **3.2. Home Screen (`Start`):**
        * - [ ] Use `HeroCarousel` for featured collections
        * - [ ] Implement `HorizontalProductCarousel` for each collection
        * - [ ] Add `RecentlyViewed` section using local storage
        * - [ ] Use `PersonalityPacksCarousel` for personality-based shopping
    * - [ ] **3.3. Search Screen (`Suche`):**
        * - [ ] Implement `SearchBar` and `FilterBar` components
        * - [ ] Create category grid using `CategoryCard` components
        * - [ ] Add product grid with `ProductCard` components
        * - [ ] Implement filter and sort functionality

---

## **Phase 4: Product Detail & Personalization**

* **Goal:** Build product detail pages with personalization features.
* **Steps/Tasks:**
    * - [ ] **4.1. Product Detail Page:**
        * - [ ] Create detailed product view using UI components
        * - [ ] Implement image gallery and product information
        * - [ ] Add personalization input fields with character limits
        * - [ ] Use `ShopTheLook` for "Complete the Set" carousel
    * - [ ] **4.2. Personalization System:**
        * - [ ] Implement conditional input fields based on product type
        * - [ ] Add 200-character limit validation
        * - [ ] Create personalization preview functionality

---

## **Phase 5: E-commerce Core Features**

* **Goal:** Implement shopping cart, wishlist, and checkout functionality.
* **Steps/Tasks:**
    * - [ ] **5.1. Shopping Cart:**
        * - [ ] Implement cart state management with Zustand
        * - [ ] Create cart screen using `CartItem` components
        * - [ ] Add quantity controls and remove functionality
        * - [ ] Implement cart persistence in local storage
    * - [ ] **5.2. Wishlist Features:**
        * - [ ] Implement wishlist toggle in `ProductCard`
        * - [ ] Create wishlist screen with grid layout
        * - [ ] Add empty state with friendly messaging
        * - [ ] Implement wishlist persistence
    * - [ ] **5.3. Checkout Integration:**
        * - [ ] Integrate with Shopify Storefront API checkout
        * - [ ] Create checkout flow with personalization data
        * - [ ] Implement guest checkout as default

---

## **Phase 6: User Accounts & Polish**

* **Goal:** Add user authentication and final polish to the application.
* **Steps/Tasks:**
    * - [ ] **6.1. User Authentication:**
        * - [ ] Implement Shopify customer authentication
        * - [ ] Create login/signup forms using UI components
        * - [ ] Add profile screen with user information
    * - [ ] **6.2. Order History:**
        * - [ ] Create order history screen
        * - [ ] Implement order fetching from Shopify
        * - [ ] Display order details with proper formatting
    * - [ ] **6.3. Final Polish:**
        * - [ ] Add loading states and error handling
        * - [ ] Implement proper accessibility features
        * - [ ] Add haptic feedback throughout the app
        * - [ ] Optimize performance and animations

---

## **Technical Requirements**

### **Styling & Theming**
- **Shopify Restyle**: All styling must use Shopify Restyle instead of NativeWind
- **Theme System**: Comprehensive theme with colors, typography, spacing, and animations
- **Design System**: "Warm & Elegant Minimalism" with proper component variants

### **Import Paths**
All imports must use the configured path aliases:
- `components/*` for component imports
- `screens/*` for screen imports  
- `services/*` for service imports
- `assets/*` for asset imports
- `context/*` for context imports
- `navigation/*` for navigation imports
- `theme/*` for theme imports
- `hooks/*` for hook imports

### **Component Architecture**
- **Atomic Design**: All components follow atomic design principles
- **Reusability**: Components must be highly reusable and themable
- **TypeScript**: Full TypeScript support with proper interfaces
- **Accessibility**: Proper accessibility labels and roles throughout

### **Performance & Quality**
- **Animations**: Smooth spring animations using react-native-reanimated
- **Image Optimization**: Efficient image loading and caching
- **State Management**: Efficient state management with Zustand
- **Error Handling**: Comprehensive error handling and user feedback
