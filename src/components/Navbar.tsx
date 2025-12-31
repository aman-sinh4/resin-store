'use client';

import Link from 'next/link';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-neutral-800" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Resin Store
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/shop" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors relative group">
              Raw Materials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/preservation" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors relative group">
              Preservation Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[10px] font-bold text-white dark:text-black shadow-sm">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
