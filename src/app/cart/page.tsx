'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, validateCart, isLoading, error } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (isLoading) {
    return <div className="text-center text-white p-12">Chargement du panier...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-12">Erreur: {error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-8">Votre Panier</h1>
        {cartItems.length === 0 ? (
          <div className="text-center bg-gray-800 p-8 rounded-lg">
            <p className="text-xl text-gray-400">Votre panier est vide.</p>
            <Link href="/" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200">
                Retourner à la boutique
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image || 'https://placehold.co/100x100/2d3748/ffffff/png?text=Image'}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-400">{item.price.toFixed(2)}€</p>
                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
              </div>
            ))}
             <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Total: {totalPrice.toFixed(2)}€</h2>
              <button 
                onClick={validateCart}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Valider la commande
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 