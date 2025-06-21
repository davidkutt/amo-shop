import React, { createContext, useState, useContext } from 'react';

interface WishlistContextType {
  wishlistItems: string[]; // We will only store the product IDs
  toggleWishlist: (productId: string) => void;
  isItemInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const toggleWishlist = (productId: string) => {
    setWishlistItems((prevItems) => {
      if (prevItems.includes(productId)) {
        // If item is already in wishlist, remove it
        return prevItems.filter((id) => id !== productId);
      } else {
        // Otherwise, add it
        return [...prevItems, productId];
      }
    });
  };

  const isItemInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isItemInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
