import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reusing the Product interface from our other components
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

interface RecentlyViewedState {
  products: Product[];
  addProduct: (product: Product) => void;
  loadProducts: () => Promise<void>;
}

const STORAGE_KEY = '@recently-viewed';
const MAX_RECENTLY_VIEWED = 10;

export const useRecentlyViewedStore = create<RecentlyViewedState>((set, get) => ({
  products: [],

  addProduct: async (product) => {
    // Get the current list of products from the state
    const currentProducts = get().products;

    // Remove the product if it already exists to avoid duplicates and move it to the front
    const filteredProducts = currentProducts.filter((p) => p.id !== product.id);

    // Add the new product to the beginning of the list
    const newProducts = [product, ...filteredProducts];

    // Limit the list to the maximum number of items
    const limitedProducts = newProducts.slice(0, MAX_RECENTLY_VIEWED);

    // Update the state in Zustand
    set({ products: limitedProducts });

    // Save the updated list to AsyncStorage
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(limitedProducts));
    } catch (e) {
      console.error('Failed to save recently viewed products.', e);
    }
  },

  loadProducts: async () => {
    try {
      const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProducts !== null) {
        // If we found products in storage, update the state
        set({ products: JSON.parse(storedProducts) });
      }
    } catch (e) {
      console.error('Failed to load recently viewed products.', e);
    }
  },
}));

// --- Initialize the store ---
// This calls loadProducts() once when the app starts up
useRecentlyViewedStore.getState().loadProducts();
