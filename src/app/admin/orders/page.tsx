'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {orders.map((order: any) => (
            <li key={order._id} className="p-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <p className="font-medium text-indigo-600 truncate">{order._id}</p>
                    <p className="ml-1 flex-shrink-0 font-normal text-gray-500">for {order.customerName}</p>
                  </div>
                  <div className="mt-2 flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <p>
                        Total: <span className="font-medium text-gray-900 hidden sm:inline">₹{order.totalAmount}</span>
                        <span className="sm:hidden">₹{order.totalAmount}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                   <div 
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                        ${order.orderStatus === 'placed' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.orderStatus === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      `}
                   >
                     {order.orderStatus || 'Placed'}
                   </div>
                </div>
              </div>
            </li>
          ))}
          {orders.length === 0 && !loading && (
             <li className="p-6 text-center text-gray-500">No recent orders</li>
          )}
        </ul>
      </div>
    </div>
  );
}
