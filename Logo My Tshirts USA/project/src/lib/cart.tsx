import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '@/lib/supabase';

export type CartItem = {
  product: Product;
  quantity: number;
  color: string;
  size: string;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity: number, color: string, size: string) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity: number, color: string, size: string) => {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.product.id === product.id && i.color === color && i.size === size,
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], quantity: next[existing].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity, color, size }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((_, i) => i !== index);
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * Number(i.product.price), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
