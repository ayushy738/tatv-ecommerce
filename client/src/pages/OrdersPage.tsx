import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from "../context/AppContext";
import { useContext } from "react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (

    <div className="">
      <Navbar />
      <div className="mx-5 p-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>


        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
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

                  <span
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full',
                      statusColorMap[order.status] || 'bg-gray-200 text-gray-800'
                    )}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id + item.sizes.join(',')}
                      className="flex items-center gap-4 border-t pt-4"
                    >
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        {item.sizes[0] && <p className="text-sm text-gray-500">Size: {item.sizes[0]}</p>}
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.discountedPrice}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <h3 className="font-semibold mb-1">Shipping Address</h3>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}, {order.address.city}</p>
                  <p>{order.address.state} - {order.address.zipcode}</p>
                  <p>{order.address.country}</p>
                  <p>Phone: {order.address.phone}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="px-4 py-2 mt-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Refresh Status
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}
