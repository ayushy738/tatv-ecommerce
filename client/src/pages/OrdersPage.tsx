
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  expectedDelivery?: string;
  trackingNumber?: string;
}

const OrdersPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "delivered",
      total: 2299,
      items: [
        {
          id: "p1",
          name: "Skechers Fliantops Performance Sport Shoes",
          image: "/products/filantop-sports-shoes.jpg",
          price: 1699,
          quantity: 1
        },
        {
          id: "p7",
          name: "PUMA Red Sliders",
          image: "/products/red-puma-slides2.jpg",
          price: 499,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: "Home",
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
      },
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD002",
      date: "2024-01-20",
      status: "shipped",
      total: 1749,
      items: [
        {
          id: "p2",
          name: "Nike Zoomx Sports Shoes",
          image: "/products/Nike-zoomx-sports.jpg",
          price: 1699,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: "Office",
        address: "456 Business Park, Floor 12",
        city: "Mumbai", 
        state: "Maharashtra",
        pincode: "400002"
      },
      expectedDelivery: "2024-01-25",
      trackingNumber: "TRK987654321"
    },
    {
      id: "ORD003",
      date: "2024-01-22",
      status: "processing",
      total: 599,
      items: [
        {
          id: "p23",
          name: "T900 Ultra Smartwatch with Orange Strap",
          image: "/products/T900-smart-watch.jpg",
          price: 599,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: "Home",
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra", 
        pincode: "400001"
      },
      expectedDelivery: "2024-01-28"
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filterOrdersByStatus = (status?: Order['status']) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track your orders and view order history</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />
              ))}
            </TabsContent>

            <TabsContent value="processing" className="space-y-6">
              {filterOrdersByStatus('processing').map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />
              ))}
            </TabsContent>

            <TabsContent value="shipped" className="space-y-6">
              {filterOrdersByStatus('shipped').map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />
              ))}
            </TabsContent>

            <TabsContent value="delivered" className="space-y-6">
              {filterOrdersByStatus('delivered').map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />
              ))}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-6">
              {filterOrdersByStatus('cancelled').map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />
              ))}
            </TabsContent>
          </Tabs>

          {/* Order Details Modal */}
          {selectedOrder && (
            <OrderDetailsModal 
              order={orders.find(o => o.id === selectedOrder)!} 
              onClose={() => setSelectedOrder(null)} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const OrderCard: React.FC<{ order: Order; onViewDetails: (id: string) => void }> = ({ order, onViewDetails }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {order.status}
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-lg font-bold">Total: ₹{order.total}</p>
            {order.expectedDelivery && order.status !== 'delivered' && (
              <p className="text-sm text-gray-600">
                Expected delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(order.id)}>
              View Details
            </Button>
            {order.status === 'shipped' && (
              <Button size="sm">
                <Truck className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order Details - #{order.id}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Status & Tracking */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
              {order.trackingNumber && (
                <div className="text-sm">
                  <span className="text-gray-600">Tracking: </span>
                  <span className="font-mono">{order.trackingNumber}</span>
                </div>
              )}
            </div>
            
            {order.expectedDelivery && order.status !== 'delivered' && (
              <p className="text-sm text-gray-600">
                Expected delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600 pl-6">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold">Items Ordered</h3>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-lg font-bold">₹{order.total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            {order.status === 'delivered' && (
              <Button variant="outline" className="flex-1">
                Rate & Review
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get status color and icon (same as above)
const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'processing': return 'bg-yellow-500';
    case 'shipped': return 'bg-blue-500';
    case 'delivered': return 'bg-green-500';
    case 'cancelled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'processing': return <Clock className="h-4 w-4" />;
    case 'shipped': return <Truck className="h-4 w-4" />;
    case 'delivered': return <CheckCircle className="h-4 w-4" />;
    case 'cancelled': return <Package className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

export default OrdersPage;
