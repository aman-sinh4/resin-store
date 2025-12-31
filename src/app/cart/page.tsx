'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-neutral-900">Your cart is empty</h2>
        <p className="text-neutral-500">Looks like you haven't added anything yet.</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Shopping Cart</h1>
        
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 border-b border-t border-neutral-200 dark:border-neutral-800">
              {items.map((item) => (
                <li key={item.productId} className="flex py-6 sm:py-10">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
                    <img
                      src={item.image || 'https://placehold.co/100x100'}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link href={`/product/${item.productId}`} className="font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-white">
                              {item.title}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-300">₹{item.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center space-x-2">
                           <button 
                              className="px-2 py-1 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                           >
                               -
                           </button>
                           <span className="text-sm w-8 text-center text-neutral-900 dark:text-white">{item.quantity}</span>
                           <button 
                              className="px-2 py-1 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                           >
                               +
                           </button>
                        </div>
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 p-2 text-neutral-400 hover:text-red-500"
                            onClick={() => removeItem(item.productId)}
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="mt-16 rounded-lg bg-neutral-50 dark:bg-neutral-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Order summary</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600 dark:text-neutral-400">Subtotal</dt>
                <dd className="text-sm font-medium text-neutral-900 dark:text-white">₹{total}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <dt className="text-base font-medium text-neutral-900 dark:text-white">Order total</dt>
                <dd className="text-base font-medium text-neutral-900 dark:text-white">₹{total}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
