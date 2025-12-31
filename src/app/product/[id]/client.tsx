'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Check } from 'lucide-react';

export default function ProductDetailClient({ product }: { product: any }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image Gallery */}
          <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
            <img
              src={product.images[0] || 'https://placehold.co/600x600'}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{product.title}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-neutral-900">₹{product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-neutral-700">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-3">
                 <p className="text-sm text-neutral-500">Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <div className="flex items-center border border-neutral-300 rounded-md">
                <button 
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-2 text-neutral-900 font-medium">{quantity}</span>
                <button 
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 max-w-xs"
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
