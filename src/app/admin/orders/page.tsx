'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, Filter, Calendar, Loader2, Mail, Phone, ExternalLink, X, ShoppingBag, MapPin, CreditCard, ChevronRight, User } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map((o: any) => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
        }
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const date = new Date(order.createdAt);
      const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
      const matchesMonth = monthFilter === 'all' || (date.getMonth() + 1).toString() === monthFilter;
      const matchesYear = yearFilter === 'all' || date.getFullYear().toString() === yearFilter;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        order._id.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.phone.toLowerCase().includes(searchLower);

      return matchesStatus && matchesMonth && matchesYear && matchesSearch;
    });
  }, [orders, statusFilter, monthFilter, yearFilter, searchQuery]);

  const years = useMemo(() => {
    const yearsSet = new Set<string>();
    orders.forEach((order: any) => {
      yearsSet.add(new Date(order.createdAt).getFullYear().toString());
    });
    if (yearsSet.size === 0) yearsSet.add(new Date().getFullYear().toString());
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [orders]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      {/* Filters Section */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search ID, Name, Email..."
            className="w-full rounded-lg border border-neutral-400 py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none text-neutral-900 placeholder-neutral-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-neutral-500" />
          <select
            className="w-full rounded-lg border border-neutral-400 py-2 px-3 text-sm focus:border-black focus:outline-none text-neutral-900"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-neutral-500" />
          <select
            className="w-full rounded-lg border border-neutral-400 py-2 px-3 text-sm focus:border-black focus:outline-none text-neutral-900"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <select
          className="w-full rounded-lg border border-neutral-400 py-2 px-3 text-sm focus:border-black focus:outline-none text-neutral-900"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-900 font-bold">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredOrders.map((order: any) => (
                <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs text-neutral-500 mb-1">#{order._id.slice(-6).toUpperCase()}</p>
                    <p className="font-medium text-neutral-900">{order.items.length} Items</p>
                    <p className="text-[10px] text-neutral-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900">{order.customerName}</p>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="flex items-center text-xs text-neutral-500">
                        <Mail className="h-3 w-3 mr-1" /> {order.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border
                      ${order.orderStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-100' : 
                        order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                        order.orderStatus === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-yellow-50 text-yellow-700 border-yellow-100'}
                    `}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center text-black font-semibold hover:underline"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="py-12 text-center text-neutral-500">
            <p>No orders found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Order Details</h2>
                <p className="text-sm text-neutral-500">Order ID: #{selectedOrder._id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Status Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Current Status</p>
                  <p className="text-lg font-bold text-neutral-900 capitalize">{selectedOrder.orderStatus}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select 
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                    disabled={isUpdatingStatus}
                    className="block w-full rounded-lg border border-neutral-400 bg-white py-2 px-4 text-sm font-bold text-neutral-900 focus:border-black focus:outline-none disabled:opacity-50 shadow-sm transition-all"
                  >
                    <option value="placed">Placed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Customer Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neutral-900">
                    <User className="h-5 w-5 text-neutral-400" />
                    <h3 className="font-bold">Customer Info</h3>
                  </div>
                  <div className="space-y-2 rounded-xl border border-neutral-100 p-4 shadow-sm">
                    <p className="text-sm font-bold text-neutral-900">{selectedOrder.customerName}</p>
                    <p className="flex items-center text-xs text-neutral-600">
                      <Mail className="h-3 w-3 mr-2" /> {selectedOrder.email}
                    </p>
                    <p className="flex items-center text-xs text-neutral-600">
                      <Phone className="h-3 w-3 mr-2" /> {selectedOrder.phone}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neutral-900">
                    <MapPin className="h-5 w-5 text-neutral-400" />
                    <h3 className="font-bold">Shipping Address</h3>
                  </div>
                  <div className="space-y-1 rounded-xl border border-neutral-100 p-4 shadow-sm">
                    <p className="text-xs text-neutral-600">{selectedOrder.address.street}</p>
                    <p className="text-xs text-neutral-600">{selectedOrder.address.city}, {selectedOrder.address.state}</p>
                    <p className="text-xs text-neutral-600">{selectedOrder.address.zip}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-neutral-900">
                  <ShoppingBag className="h-5 w-5 text-neutral-400" />
                  <h3 className="font-bold">Order Items</h3>
                </div>
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-50 text-neutral-500 font-medium">
                      <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Qty</th>
                        <th className="px-4 py-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {selectedOrder.items.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-medium text-neutral-900">{item.title}</td>
                          <td className="px-4 py-3 text-neutral-600">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-neutral-900 font-medium">₹{item.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-neutral-50 font-bold border-t border-neutral-200">
                      <tr>
                        <td colSpan={2} className="px-4 py-3 text-neutral-900">Total Amount</td>
                        <td className="px-4 py-3 text-right text-neutral-900">₹{selectedOrder.totalAmount.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-neutral-900">
                  <CreditCard className="h-5 w-5 text-neutral-400" />
                  <h3 className="font-bold">Payment Information</h3>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-neutral-100 p-4 shadow-sm">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Method</p>
                    <p className="text-sm font-bold text-neutral-900 uppercase">{selectedOrder.paymentMethod.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 mb-1">Status</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider
                      ${selectedOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                    `}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


