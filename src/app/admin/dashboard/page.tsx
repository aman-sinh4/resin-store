'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, TrendingUp, Package, Loader2 } from 'lucide-react';

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/products'),
        ]);

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        if (ordersData.success && productsData.success) {
          const orders = ordersData.data || [];
          const products = productsData.data || [];
          
          const totalSales = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
          
          setStats({
            totalOrders: orders.length,
            totalSales: totalSales,
            totalProducts: products.length,
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  const statCards = [
    { name: 'Total Orders', value: stats.totalOrders.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Sales', value: `₹${stats.totalSales.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Products in Stock', value: stats.totalProducts.toString(), icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.name} className="overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-neutral-100 transition-all hover:shadow-md">
            <div className="flex items-center">
              <div className={`rounded-lg p-3 ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-neutral-500 truncate">{card.name}</p>
                <p className="text-2xl font-bold text-neutral-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

