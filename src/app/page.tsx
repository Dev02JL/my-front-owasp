import ProductGrid from '@/components/ProductGrid';

export default function HomePage() {
  return (
    <div className="bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow px-4 py-2 rounded-md mb-8">
          <h1 className="text-xl font-semibold text-white">All Products</h1>
        </div>
        <ProductGrid />
      </main>
    </div>
  );
}
