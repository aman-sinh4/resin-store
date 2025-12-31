'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Delete handler (placeholder)
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    // Call API to delete
    alert('Delete functionality to be implemented in API');
  };

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden bg-white shadow rounded-lg">
         <ul role="list" className="divide-y divide-gray-200">
            {products.map((product: any) => (
              <li key={product._id} className="flex py-4 px-6 items-center justify-between hover:bg-gray-50">
                 <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover" src={product.images[0] || 'https://placehold.co/100x100'} alt="" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{product.title}</p>
                      <p className="text-sm text-gray-500">₹{product.price} | Stock: {product.stock}</p>
                    </div>
                 </div>
                 <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                       <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product._id)}>
                       <Trash2 className="h-5 w-5" />
                    </button>
                 </div>
              </li>
            ))}
            {products.length === 0 && !loading && (
              <li className="py-4 px-6 text-center text-gray-500">No products found.</li>
            )}
         </ul>
      </div>
    </div>
  );
}
