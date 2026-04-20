import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  cartKey: string;          // unique line identity (productId + theme + size)
  id: number;               // product id (used for Stripe price mapping)
  name: string;
  price: number;
  image: string;
  category: string;
  theme?: string;           // visual theme variant the user added
  size?: string;            // selected size (if applicable)
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity' | 'cartKey'> & { cartKey?: string }) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const buildCartKey = (id: number, theme?: string, size?: string) =>
  `${id}::${theme ?? 'default'}::${size ?? 'one-size'}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart: CartContextType['addToCart'] = (product) => {
    const cartKey = product.cartKey ?? buildCartKey(product.id, product.theme, product.size);
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.cartKey === cartKey);

      if (existingItem) {
        return currentItems.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, cartKey, quantity: 1 }];
    });
  };

  const removeFromCart = (cartKey: string) => {
    setItems(currentItems => currentItems.filter(item => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartKey);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.cartKey === cartKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
