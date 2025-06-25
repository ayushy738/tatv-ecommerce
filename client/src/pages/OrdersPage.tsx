
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from "../context/AppContext";
import { useContext } from "react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface OrderItem {
  id: string;
  name: string;
  image: string[];
  price: number;
  discountedPrice: number;
  quantity: number;
  sizes: string[];
}

interface Order {
  _id: string;
  date: number;
  status: string;
  amount: number;
  items: OrderItem[];
  paymentMethod: string;
  payment: boolean;
  address: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
  };
}

const statusColorMap: Record<string, string> = {
  OrderPlaced: 'bg-blue-100 text-blue-700',
  Packing: 'bg-orange-100 text-orange-700',
  Shipped: 'bg-cyan-100 text-cyan-700',
  OutforDelivery: 'bg-teal-100 text-teal-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const { backendUrl, token } = useContext(AppContent);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancellingOrders, setCancellingOrders] = useState<Set<string>>(new Set());

  const loadOrderData = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (err) {
      console.error(err);
    }
  };


  const canCancelOrder = (status: string) => {
    return ['OrderPlaced', 'Packing'].includes(status);
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">My Orders</h1>
        <p className="mb-6 text-center text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg py-2 px-4">
          To cancel order, email <a href="mailto:tatvecommerce@gmail.com" className="text-blue-600 underline">tatvecommerce@gmail.com</a> or call <a href="tel:+917794033470" className="text-blue-600 underline">+91 77940 33470</a>
        </p>

        {orders.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M8 11v1a3 3 0 006 0v-1m7 0a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1h16a1 1 0 001-1v-9z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
            <Button asChild>
              <a href="/">Start Shopping</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 bg-white"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 space-y-3 md:space-y-0">
                  <div className="space-y-1">
                    <h2 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h2>
                    <p className="text-sm text-gray-600">
                      Placed on: {format(new Date(order.date), 'dd MMM yyyy, hh:mm a')}
                    </p>
                    <p className="text-sm text-gray-600">Amount: ₹{order.amount}</p>
                    <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
                    <p className="text-sm text-gray-600">
                      Payment Status: {order.payment ? 'Paid' : 'Pending'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span
                      className={cn(
                        'px-3 py-1 text-xs font-medium rounded-full',
                        statusColorMap[order.status] || 'bg-gray-200 text-gray-800'
                      )}
                    >
                      {order.status}
                    </span>
                    
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id + item.sizes.join(',')}
                      className="flex items-center gap-3 md:gap-4 border-t pt-4"
                    >
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm md:text-base truncate">{item.name}</p>
                        {item.sizes[0] && <p className="text-sm text-gray-500">Size: {item.sizes[0]}</p>}
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm md:text-base">₹{item.discountedPrice}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm md:text-base">Shipping Address</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}, {order.address.city}</p>
                    <p>{order.address.state} - {order.address.zipcode}</p>
                    <p>{order.address.country}</p>
                    <p>Phone: {order.address.phone}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button
                    onClick={loadOrderData}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                  >
                    Refresh Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
