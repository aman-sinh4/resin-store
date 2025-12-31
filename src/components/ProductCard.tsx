import Link from 'next/link';
import { IProduct } from '@/models/Product';
import { Button } from './ui/Button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: IProduct; 
}

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/product/${product._id}`} className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={product.images[0] || 'https://placehold.co/600x600'}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        {product.stock === 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Out of Stock
          </div>
        )}
        {/* Overlay with Quick Action */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
           {/* Placeholder for quick add if needed later */}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white line-clamp-1">
          <Link href={`/product/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{product.category}</p>
        <div className="mt-4 flex flex-1 items-end justify-between">
          <p className="text-lg font-bold text-neutral-900 dark:text-white">₹{product.price}</p>
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
             <div className="rounded-full bg-black dark:bg-white p-2 text-white dark:text-black">
                <ShoppingCart className="h-4 w-4" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
