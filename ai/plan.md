# Joyful Pets App Implementation Plan

This plan outlines the steps for building the "Joyful Pets" React Native application. It is structured into sequential phases, with each phase delivering a "vertical slice" of functionality. Each task is a checkbox that can be marked off by you or your coding AI to track progress.

---

### **Phase 1: Project Foundation & Core UI Shell**

* **Goal:** Establish the project structure, install dependencies, configure styling and navigation, and connect to the Shopify API. This phase builds the app's skeleton.
* **Steps/Tasks:**
    * - [x] **1.1. Project Initialization:** Set up a new React Native project. Install core dependencies: `react-navigation`, a Tailwind CSS library (e.g., `nativewind`), and a state manager (e.g., `zustand`).
    * - [ ] **1.2. Theming & Styling:** Configure the Tailwind CSS theme file (`tailwind.config.js`) with the exact color palette (`primary`, `background`, `text`, accents) and the `Nunito` font family as defined in `prd.md`.
    * - [ ] **1.3. Navigation Setup:**
        * - [ ] Implement a main Tab Navigator.
        * - [ ] Create the four required tabs with German labels: `Start`, `Suche`, `Merkliste`, `Profil`.
        * - [ ] Create placeholder screen files for each tab.
    * - [ ] **1.4. Basic Reusable Components:** Create and style initial versions of core UI components:
        * - [ ] `components/ui/Button.tsx`: A fully rounded button using the primary color with the `active:scale-95` animation.
        * - [ ] `components/ui/ProductCard.tsx`: A skeleton card with rounded corners and a soft shadow, ready for product data.
        * - [ ] `components/ui/ScreenWrapper.tsx`: A wrapper to handle safe areas and apply the default background color.
    * - [ ] **1.5. Shopify API Connection:**
        * - [ ] Set up the Shopify Storefront API client (using GraphQL).
        * - [ ] Securely store API credentials in environment variables.
        * - [ ] Create a test function to fetch basic shop information (e.g., shop name) to verify the connection.

---

### **Phase 2: Product Discovery (Home & Search)**

* **Goal:** Fetch products and collections from Shopify and display them on the Home and Search screens, enabling basic product discovery.
* **Steps/Tasks:**
    * - [ ] **2.1. Shopify Data Queries:** Implement GraphQL queries to fetch:
        * - [ ] A list of all "Design Collections".
        * - [ ] A list of products belonging to a specific collection.
        * - [ ] A list of all `Product Categories` (this might be derived from product tags or types).
    * - [ ] **2.2. Home Screen (`Start`) Implementation:**
        * - [ ] Fetch the "Design Collections" data.
        * - [ ] Render a vertical list of horizontal carousels, one for each collection.
        * - [ ] Populate the carousels with the `ProductCard` component, passing in product data (image, name, price).
    * - [ ] **2.3. Search Screen (`Suche`) Default View:**
        * - [ ] Implement the default state of the screen.
        * - [ ] Display the Search & Filter bar UI at the top.
        * - [ ] Fetch the list of all product categories and display them as a grid of clickable cards below the bar.
    * - [ ] **2.4. Home-to-Search Navigation:** Implement the interaction where tapping a collection title on the `Start` screen navigates to the `Suche` screen, passing the collection's ID to pre-filter the view.

---

### **Phase 3: Product Detail Page & Personalization**

* **Goal:** Allow users to view detailed information about a single product, see related items, and enter personalization text.
* **Steps/Tasks:**
    * - [ ] **3.1. Navigation to PDP:** Make `ProductCard` components tappable, navigating to a `ProductDetailScreen` and passing the product ID.
    * - [ ] **3.2. PDP Data Fetching:** Create a GraphQL query to fetch all details for a single product by its ID.
    * - [ ] **3.3. PDP UI Implementation:** Display all fetched product data: images, title, description, price.
    * - [ ] **3.4. Personalization Input:**
        * - [ ] Conditionally render single-line text inputs based on the product type (`Pet Name`, `Phone Number`).
        * - [ ] Enforce the 200-character limit on the inputs.
    * - [ ] **3.5. "Complete the Set" Carousel:**
        * - [ ] On the PDP, fetch the other products from the same "Design Collection".
        * - [ ] Display them in a horizontal carousel at the bottom of the screen under the title "Complete the Set".

---

### **Phase 4: Local Persistence (Wishlist & Recently Viewed)**

* **Goal:** Implement client-side persistence for user engagement features using the device's local storage.
* **Steps/Tasks:**
    * - [ ] **4.1. Local Storage Service:** Create a utility service (`services/localStorage.ts`) to abstract `AsyncStorage` operations (get, set, remove items).
    * - [ ] **4.2. Recently Viewed Logic:**
        * - [ ] On PDP mount, add the current product to a "recently viewed" list in local storage (ensure the list is unique and capped at 10 items).
        * - [ ] Create and display the "Recently Viewed" section on the `Start` screen by fetching and displaying these products.
    * - [ ] **4.3. Guest Wishlist Logic:**
        * - [ ] Add a functional "Wishlist" button (a circular icon button) to the `ProductCard` and `PDP`.
        * - [ ] Toggling the button adds or removes the product ID from a wishlist array in local storage.
    * - [ ] **4.4. Wishlist Screen (`Merkliste`) UI:**
        * - [ ] On screen load, get the list of product IDs from local storage.
        * - [ ] Fetch the full product details from Shopify for those IDs.
        * - [ ] Display the products in a grid.
        * - [ ] Implement the "Empty State" UI (friendly message and icon) if the list is empty.

---

### **Phase 5: Core E-commerce Flow (Cart & Checkout)**

* **Goal:** Enable the full shopping funnel, from adding a personalized item to the cart to initiating the Shopify checkout.
* **Steps/Tasks:**
    * - [ ] **5.1. Cart State Management:** Set up a `zustand` store (or equivalent) to manage the cart's state (an array of cart items with product details, quantity, and personalization text).
    * - [ ] **5.2. "Add to Cart" Functionality:** Implement the "Add to Cart" button on the PDP. This action should add the current product, its selected quantity, and any personalization data to the global cart state.
    * - [ ] **5.3. Cart Persistence:** Use the local storage service to save the cart state whenever it changes and rehydrate the state when the app launches.
    * - [ ] **5.4. Shopping Cart UI:**
        * - [ ] Create a dedicated `CartScreen` or modal.
        * - [ ] Display all items in the cart, including their personalization text.
        * - [ ] Allow users to update quantities or remove items.
        * - [ ] Display the subtotal and total price.
    * - [ ] **5.5. Shopify Checkout Integration:**
        * - [ ] Implement the `checkout` action.
        * - [ ] Use the Shopify Storefront API to create a `checkoutCreate` mutation with the cart items.
        * - [ ] Redirect the user to the returned `webUrl` in an in-app browser.

---

### **Phase 6: User Accounts & Profile**

* **Goal:** Finalize the MVP by adding optional user accounts for order history and wishlist syncing.
* **Steps/Tasks:**
    * - [ ] **6.1. Shopify Customer Authentication:** Implement actions for:
        * - [ ] `customerCreate` (Sign Up)
        * - [ ] `customerAccessTokenCreate` (Login)
        * - [ ] `customerAccessTokenDelete` (Logout)
    * - [ ] **6.2. Authentication UI:** Create simple, modal-based forms for Login and Sign Up, accessible from the `Profil` tab.
    * - [ ] **6.3. Profile Screen (`Profil`) UI:**
        * - [ ] If the user is logged out, display "Login" and "Sign Up" buttons.
        * - [ ] If logged in, display links for `Order History`, `Personal Details`, and a `Logout` button.
    * - [ ] **6.4. Order History Implementation:**
        * - [ ] Create an `OrderHistoryScreen`.
        * - [ ] Fetch the logged-in customer's orders from Shopify.
        * - [ ] Display the orders in a list, showing `Order Date`, `Number`, `Total Price`, and `Status`.
    * - [ ] **6.5. Wishlist Sync on Login:**
        * - [ ] On successful login, fetch the user's server-side wishlist (if stored in metafields).
        * - [ ] Add any fetched items to the user's local storage wishlist to unify the view.
