'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { getProducts } from '@/services/apiService';

const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    if (loading) {
        return <p className="text-center text-white">Chargement des produits...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
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