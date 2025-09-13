# Product Requirements Document: Joyful Pets App (v1.5 - MVP Final)

This document outlines the product requirements, design principles, and technical specifications for the initial build (Minimum Viable Product) of the "Herzenshund" e-commerce mobile application.

---

## 1. Overview

### 1.1. Core Concept
The app is a celebration of a pet's unique personality and the joy of pet ownership. It's a React Native e-commerce application designed to sell Print-on-Demand (POD) dog accessories from an existing Shopify store. The user experience is bright, happy, and emotionally engaging, feeling less like a utility and more like a fun, celebratory space.

### 1.2. Target Audience
Dog owners who view their pets as family and are enthusiastic about purchasing personalized, stylish, and unique accessories for them.

### 1.3. Business Goal
To create a dedicated, brand-focused mobile sales channel that increases customer engagement and drives sales of POD products by offering a joyful and seamless shopping experience.

---

## 2. Design Language & UI/UX Principles

### 2.1. Aesthetic & Feel
The app's feel is **approachable, vibrant, soft, and optimistic**. The UI will feel tactile and responsive, with a friendly and welcoming tone.

### 2.2. Color Palette
The color palette is built on soft, smooth pastels with enough vibrancy to feel cheerful. All colors are sourced from the Tailwind CSS palette.

| Role | Name | Hex Code | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Primary** | Soft Blue | `#93c5fd` | `blue-300` |
| **Background** | Light Off-White | `#f8fafc` | `slate-50` |
| **Text** | Soft Charcoal | `#334155` | `slate-700` |
| **Accent 1** | Cheerful Yellow | `#fde047` | `yellow-300` |
| **Accent 2** | Playful Pink | `#f9a8d4` | `pink-300` |
| **Accent 3** | Fresh Green | `#5eead4` | `teal-300` |
| **Accent 4** | Warm Peach | `#fed7aa` | `orange-200` |

### 2.3. Typography
The primary font will be **Nunito** (or a similar rounded sans-serif) to feel modern and welcoming.

| Variant | Weight | Usage |
| :--- | :--- | :--- |
| `title` | Extra-Bold | Major screen headings. |
| `subtitle` | Bold | Section headings (e.g., "New Arrivals"). |
| `body` | Regular | Product descriptions and longer text blocks. |
| `small` | Medium | Secondary info (e.g., tab bar labels, tags). |

### 2.4. UI Style & Components
- **Shape & Spacing:** All primary elements (buttons, cards, images) will use generous corner rounding (`rounded-3xl` to `rounded-full`). Layouts will feature ample whitespace to feel uncluttered.
- **Buttons:** Will be fully rounded (`rounded-full`) and use the `primary` color. They must include a subtle "press-in" scale animation (`active:scale-95`).
- **Cards (`ProductCard`):** Will have a soft shadow and `rounded-3xl` corners. Interactive elements like the "Wishlist" button are circular and float over the product image.
- **Icons:** Will be simple and friendly with a slightly bolder stroke weight. Custom, playful icons are preferred.
- **Empty States:** Screens in an empty state (e.g., empty wishlist, no search results) must display a friendly message and a playful, custom-drawn icon to maintain the app's joyful tone.
- **Error Handling:** System-level errors (e.g., loss of internet connection) will be handled with a friendly, full-screen message that matches the app's design and includes a "Retry" button.

### 2.5. Animation & Interaction
- **Style:** Animations should be slightly **bouncy and satisfying**.
- **Feedback:** User actions (button/tab presses) must be confirmed with **light haptic feedback**.

### 2.6. Styling Requirements
**CRITICAL: Shopify Restyle MUST ALWAYS be used instead of regular React Native StyleSheet styling throughout the entire application.** This ensures consistency with the design system and enables proper theming. All components should use Restyle's `createRestyleComponent` and theme-based styling rather than StyleSheet.create().

**CRITICAL: ThemeProvider Setup:**
- The `ThemeProvider` from `@shopify/restyle` MUST be set up in `App.tsx` to wrap the entire application
- All components MUST access the theme through the `useTheme()` hook or by using `createBox`/`createRestyleComponent`
- NEVER import the theme directly from `theme/index.ts` in components - use `useTheme()` hook instead

**Correct Restyle Usage Pattern:**
```tsx
// ✅ CORRECT: Use useTheme hook in components
import { useTheme } from '@shopify/restyle';
import { Theme } from 'theme/index';

const MyComponent = () => {
  const theme = useTheme<Theme>();
  // Access theme values: theme.colors.primary, theme.spacing.m, etc.
};

// ✅ CORRECT: Use createBox for simple containers
import { createBox } from '@shopify/restyle';
const Box = createBox<Theme>();

// ✅ CORRECT: Use createRestyleComponent for complex components
import { createRestyleComponent, spacing, backgroundColor } from '@shopify/restyle';
const MyRestyleComponent = createRestyleComponent([spacing, backgroundColor], View);

// ❌ WRONG: Don't import theme directly in components
import theme from 'theme/index'; // This breaks theming!
```

### 2.7. Import Path Requirements
**CRITICAL: Always use the configured path aliases from babel.config.js instead of relative imports.** This ensures better maintainability and consistency across the codebase. Use the following path aliases:

- `components/*` for component imports
- `screens/*` for screen imports  
- `services/*` for service imports
- `assets/*` for asset imports
- `context/*` for context imports
- `navigation/*` for navigation imports
- `theme/*` for theme imports
- `hooks/*` for hook imports

**Example:** Use `import StartScreen from 'screens/StartScreen';` instead of `import StartScreen from '../screens/StartScreen';`

### 2.8. UI Library Architecture
**CRITICAL: The application will be built using a comprehensive e-commerce UI library that follows atomic design principles:**

- **Atomic Components:** Button, Icon, Input, Text
- **Molecular Components:** Badge, Breadcrumbs, CartItem, Checkbox, Chip, ColorSelector, Counter, Disclosure, FilterButton, FormField, RatingDisplay, SearchBar, Switch, TextInputField
- **Organism Components:** Header, HeroCarousel, HeroSection, ProductCard, CategoryCard, FilterBar, HorizontalProductCarousel, PersonalityPacksCarousel, RecentlyViewed, ShopTheLook, Tabbar

All components must be highly reusable, themable, and built using Shopify Restyle.

---

## 3. Core Features & Functionality (MVP)

### 3.1. App Navigation
The app will use a main tab bar with four items. The labels will be in German.
- **Tab 1: `Start`** (Home Screen)
- **Tab 2: `Suche`** (Search Screen)
- **Tab 3: `Merkliste`** (Wishlist Screen)
- **Tab 4: `Profil`** (Profile/Account Screen)

### 3.2. Product Organization
- **Product Categories:** The app will feature the following distinct product categories: `dog-collar`, `clip-on-bandana`, `clip-on-collar`, `collar-bandana`, `feeding mat`, `bowl`, and `tag`.
- **Design Collections:** Products will be grouped by a common design theme (e.g., "Cosmic Paws"). This should be managed via Shopify Collections or product tags.

### 3.3. Product Discovery
- **Home Screen (`Start`):**
  - **Shop by Design:** The primary view will consist of horizontally scrolling carousels. Each carousel represents a **Design Collection**.
  - **Interaction:** Tapping the title of a Design Collection navigates the user to the **`Suche` screen**, which will be pre-filtered to show only items from that specific collection.
  - **Recently Viewed:** A section displaying a maximum of 10 recently viewed products, stored in the device's local storage.
- **Search Screen (`Suche`):** - **Default State:** When opened directly from the tab bar, this screen will display a search/filter bar at the top and a grid of clickable category cards below it.
  - **Filtered State:** Displays a grid of products based on an active search query or filter.
  - **Filter & Sort Options:** The filter bar will include:
    - **Sorting:** `Newest`, `Price: Low to High`, `Price: High to Low`.
    - **Filtering:** `By Product Category`, `By Design Collection`.
- **Product Detail Page (PDP):** - A detailed view of a single product.
  - At the bottom of the page, a horizontal carousel titled **"Complete the Set"** will display other products from the same Design Collection.
- **Wishlist Screen (`Merkliste`):** - **Source of Truth:** The wishlist UI is always populated from a list in **local storage**.
  - **Login Behavior:** When a logged-in user opens the app, their account's wishlist from the server is fetched and added to the local list.

### 3.4. E-commerce Funnel
- **Personalization:** An interface on the PDP for users to customize products.
  - **Tag:** `Pet Name` (text), `Phone Number` (text)
  - **Collar:** `Pet Name` (text)
  - **Bowl:** `Pet Name` (text)
  - **Character Limit:** All text-based input fields have a maximum limit of **200 characters**.
  - **UI:** The input field for personalization will be a **single-line text input**.
- **Shopping Cart:** - Users can add, view, update quantities, and remove products from their cart.
  - The shopping cart's contents **must be saved to local storage** to persist between sessions for guest users.
- **Checkout:** Integration with the **Shopify Storefront API** to direct users to Shopify's secure web checkout. **Guest checkout is supported and is the default flow.**

### 3.5. User Account (`Profil`) (Optional)
- **Authentication:** Simple email/password sign-up and login. Creating an account is **not mandatory** for purchase.
- **Screen Content:** For logged-in users, this screen provides access to:
  - **Order History:** A list of past orders. Each item will display `Order Date`, `Order Number`, `Total Price`, and `Order Status`.
  - **Personal Details:** View `Name` and `Email`.
  - **Logout Button**.

---

## 4. Technical Requirements

- **Platform:** React Native
- **Styling:** **Shopify Restyle** (CRITICAL: No NativeWind or other styling libraries)
- **API Integration:** Shopify Storefront API
- **Local Storage:** Used for "Recently Viewed" products, the primary "Wishlist" list, and the guest user's "Shopping Cart".
- **Navigation:** React Navigation
- **State Management:** Zustand
- **UI Library:** Comprehensive e-commerce UI library with atomic, molecular, and organism components
- **Theme System:** Complete Restyle theme with colors, typography, spacing, and animations
- **Import Paths:** Must use configured path aliases (components/, screens/, services/, etc.)
- **Push Notifications:** Explicitly **excluded** from the MVP.

### 4.1. Component Requirements
All components must be built using Shopify Restyle and follow these principles:
- **Atomic Design:** Proper separation of atoms, molecules, and organisms
- **Reusability:** Highly reusable and themable components
- **TypeScript:** Full TypeScript support with proper interfaces
- **Accessibility:** Proper accessibility labels and roles
- **Performance:** Optimized for smooth animations and efficient rendering
