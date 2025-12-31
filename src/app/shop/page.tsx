'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialType);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Update filter if URL param changes (optional, but good for navigation)
  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
        setFilter(type);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((p: any) => 
    filter === 'all' ? true : p.type === filter
  );

  const getButtonClass = (active: boolean) => {
    return `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
      active 
        ? 'bg-black text-white dark:bg-white dark:text-black' 
        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
    }`;
  };

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Shop All Products</h2>
          
          <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setFilter('all')}
              className={getButtonClass(filter === 'all')}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('raw_material')}
              className={getButtonClass(filter === 'raw_material')}
            >
              Raw Materials
            </button>
            <button 
              onClick={() => setFilter('preservation_service')}
              className={getButtonClass(filter === 'preservation_service')}
            >
              Services
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="py-20 text-center text-neutral-500 dark:text-neutral-400">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
       <ShopContent />
    </Suspense>
  );
}
