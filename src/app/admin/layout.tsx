import Link from 'next/link';
import { Package, ShoppingBag, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Sidebar / Topbar for Admin */}
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold">Admin Panel</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-neutral-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                >
                  Products
                </Link>
                <Link
                  href="/admin/orders"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                >
                  Orders
                </Link>
              </div>
            </div>
            <div className="flex items-center">
               <span className="text-sm text-neutral-500 mr-4">admin@resinstore.com</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
