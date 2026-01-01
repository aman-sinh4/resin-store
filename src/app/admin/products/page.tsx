'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Filter, Loader2, Package } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

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

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesType = typeFilter === 'all' || product.type === typeFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(searchLower) || 
                           product.category.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [products, searchQuery, categoryFilter, typeFilter]);

  const categories = useMemo(() => {
    const caps = new Set<string>();
    products.forEach((p: any) => caps.add(p.category));
    return Array.from(caps).sort();
  }, [products]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(products.filter((p: any) => p._id !== id));
        } else {
            alert('Failed to delete product');
        }
    } catch (error) {
        alert('Error deleting product');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-neutral-400 py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none text-neutral-900 placeholder-neutral-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-neutral-500" />
                <select
                    className="rounded-lg border border-neutral-400 py-2 px-3 text-sm focus:border-black focus:outline-none text-neutral-900"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    className="rounded-lg border border-neutral-400 py-2 px-3 text-sm focus:border-black focus:outline-none text-neutral-900"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="raw_material">Raw Materials</option>
                    <option value="preservation_service">Services</option>
                </select>
            </div>
        </div>

        <Link href="/admin/products/new">
          <Button className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-900 font-bold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((product: any) => (
                <tr key={product._id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-lg object-cover border border-neutral-100" src={product.images[0] || 'https://placehold.co/100x100'} alt="" />
                        <div className="ml-3">
                            <p className="font-medium text-neutral-900">{product.title}</p>
                            <p className="text-xs text-neutral-500 capitalize">{product.type.replace('_', ' ')}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border
                        ${product.stock > 10 ? 'bg-green-50 text-green-700 border-green-100' : 
                          product.stock > 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                          'bg-red-50 text-red-700 border-red-100'}
                    `}>
                        {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product._id}`} className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-md transition-all">
                            <Edit2 className="h-4 w-4" />
                        </Link>
                        <button 
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                            onClick={() => handleDelete(product._id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-neutral-500">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

