'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    type: 'raw_material',
    images: '', 
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          const p = data.data;
          setFormData({
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            stock: p.stock,
            type: p.type,
            images: p.images.join(', '),
          });
        }
      } catch (error) {
        console.error('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.split(',').map(s => s.trim()),
      };

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      alert('Error updating product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6 mb-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Product</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border text-sm border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" required rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border text-sm border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} className="mt-1 block w-full rounded-md border text-sm border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" name="stock" required value={formData.stock} onChange={handleChange} className="mt-1 block w-full rounded-md border text-sm border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>

           <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" required value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border text-sm border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500" />
          </div>

           <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option value="raw_material">Raw Material</option>
              <option value="preservation_service">Preservation Service</option>
            </select>
          </div>

           <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
            <input type="text" name="images" required value={formData.images} onChange={handleChange} className="mt-1 block w-full rounded-md border text-sm border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
          </div>

        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={saving}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
