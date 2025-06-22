'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/types/product';
import { useAuth } from './AuthContext';
import { getCart, addProductToCart, removeProductFromCart, validateCart as apiValidateCart } from '@/services/apiService';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  validateCart: () => Promise<void>;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const items = await getCart();
      setCartItems(items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product: Product) => {
    try {
      await addProductToCart(product.id);
      await fetchCart(); // Re-fetch cart to get the updated state
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await removeProductFromCart(productId);
      await fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const validateCart = async () => {
    try {
      await apiValidateCart();
      await fetchCart();
      alert('Commande validée avec succès!');
    } catch (err: any) {
      setError(err.message);
      alert(`Erreur lors de la validation: ${err.message}`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, isLoading, error, addToCart, removeFromCart, validateCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 