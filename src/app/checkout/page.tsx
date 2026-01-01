'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Order
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total: total,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        // 2. Clear Cart & Redirect to Success
        // In real app, here we would trigger Razorpay
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}`);
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <div className="p-8 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">Checkout</h1>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-200 mb-6">Contact Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Address</label>
                  <input
                    type="text"
                    name="street"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-1">
                   <label htmlFor="state" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">State</label>
                   <input
                    type="text"
                    name="state"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>

                 <div className="sm:col-span-1">
                   <label htmlFor="zip" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">ZIP / Pin Code</label>
                   <input
                    type="text"
                    name="zip"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm h-10 px-3 border placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button type="submit" disabled={loading} className="w-full" isLoading={loading}>
                  Place Order (COD / Test)
                </Button>
                <p className="mt-2 text-xs text-neutral-500 text-center">
                  Payments are currently simulated for testing.
                </p>
              </div>
            </form>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Order Summary</h2>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {items.map((item) => (
                  <li key={item.productId} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 rounded-md"
                      />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col">
                       <div className="flex justify-between">
                        <span className="font-medium text-neutral-900 dark:text-white">{item.title}</span>
                        <span className="text-neutral-500 dark:text-neutral-400">x{item.quantity}</span>
                       </div>
                       <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">₹{item.price * item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-neutral-900 dark:text-white">
                  <p>Total</p>
                  <p>₹{total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
