import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const imageUrl = product.image 
    ? `${API_BASE_URL}${product.image}`
    : 'https://placehold.co/400x400/2d3748/ffffff/png?text=Image';

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative group text-white cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      {product.tag && (
        <div className="absolute top-2 -left-10 bg-green-500 text-white text-sm font-bold px-10 py-1 transform -rotate-45 z-10">
          {product.tag}
        </div>
      )}
      <div className="relative w-full h-56">
        <Image 
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-400 mt-1">{product.price.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default ProductCard; 