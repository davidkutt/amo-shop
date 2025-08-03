import React, { createContext, useState, useContext } from 'react';

// Define the shape of a cart item
interface CartItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

// Define the shape of our context
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  // We can add removeItem, clearCart, etc. later
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        // If it exists, update its quantity
        return prevItems.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If it's a new item, add it to the cart with quantity 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
    console.log('Added item:', itemToAdd.name);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily access the cart context from any component
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
