import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  vendorId: number;
  vendorName: string;
  itemId: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number, vendorId: number) => void;
  updateQuantity: (itemId: number, vendorId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem("cart") : null;
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.itemId === item.itemId && i.vendorId === item.vendorId
      );
      if (existing) {
        return prev.map((i) =>
          i.itemId === item.itemId && i.vendorId === item.vendorId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: number, vendorId: number) => {
    setCart((prev) => prev.filter((i) => !(i.itemId === itemId && i.vendorId === vendorId)));
  };

  const updateQuantity = (itemId: number, vendorId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.itemId === itemId && i.vendorId === vendorId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}; 