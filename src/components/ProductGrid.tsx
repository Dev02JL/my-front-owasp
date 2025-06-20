'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const mockProducts: Product[] = [
  { id: 1, title: 'Apple Juice (1000ml)', price: 1.99, description: 'The all-time classic.', image: 'https://placehold.co/400x400/FBF5E2/2d3748/png?text=Apple+Juice', reviews: [{id: 1, user: 'admin@juice-sh.op', comment: 'One of my favorites! 👍'}] },
  { id: 2, title: 'Apple Pomace', price: 0.89, description: 'Finest remnants of pressed apples.', image: 'https://placehold.co/400x400/FBF5E2/2d3748/png?text=Apple+Pomace', reviews: [] },
  { id: 3, title: 'Banana Juice (1000ml)', price: 1.99, description: 'For monkeys and humans alike.', image: 'https://placehold.co/400x400/FBF5E2/2d3748/png?text=Banana+Juice', reviews: [] },
  { id: 4, title: 'Best Juice Shop Salesman Artwork', price: 5000, description: 'A true masterpiece of modern art.', image: 'https://placehold.co/400x400/E2FBF2/2d3748/png?text=Artwork', tag: 'Only 1 left', reviews: [] },
  { id: 5, title: 'Carrot Juice (1000ml)', price: 2.99, description: 'You will see in the dark.', image: 'https://placehold.co/400x400/FBF5E2/2d3748/png?text=Carrot+Juice', reviews: [] },
  { id: 6, title: 'Eggfruit Juice (500ml)', price: 8.99, description: 'Exotic and delicious.', image: 'https://placehold.co/400x400/FBF5E2/2d3748/png?text=Eggfruit+Juice', reviews: [] },
];

const ProductGrid = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProductGrid; 