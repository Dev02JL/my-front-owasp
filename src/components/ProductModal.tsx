'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useAuth } from '@/context/AuthContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [reviewsOpen, setReviewsOpen] = useState(true);
  const { user } = useAuth();

  const handleAddToCart = () => {
    alert(`${product.title} added to cart!`);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl text-white max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative w-full sm:w-1/3 h-48 sm:h-auto flex-shrink-0">
                <Image
                    src={product.image || 'https://placehold.co/400x400/2d3748/ffffff/png?text=Image'}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-gray-400 mt-2">{product.description}</p>
              <p className="text-xl font-semibold mt-4">{product.price.toFixed(2)}€</p>
            </div>
          </div>
          <hr className="my-4 border-gray-700" />
          <div>
            <button className="w-full flex justify-between items-center text-left text-lg font-semibold" onClick={() => setReviewsOpen(!reviewsOpen)}>
              <span>Reviews ({product.reviews?.length || 0})</span>
              <svg className={`w-5 h-5 transform transition-transform ${reviewsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {reviewsOpen && (
              <div className="mt-4 space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-700 pb-2">
                      <p className="font-semibold text-green-400">{review.user}</p>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div>
              {user && (
                <button 
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                >
                  Ajouter au panier
                </button>
              )}
            </div>
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 