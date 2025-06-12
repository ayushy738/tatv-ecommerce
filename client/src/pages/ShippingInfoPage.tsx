
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, Package, Shield, CheckCircle } from "lucide-react";

const ShippingInfoPage: React.FC = () => {
  const shippingOptions = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Standard Delivery",
      time: "5-7 Business Days",
      price: "₹49",
      description: "Perfect for regular orders with reliable delivery timing"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Express Delivery",
      time: "2-3 Business Days",
      price: "₹99",
      description: "Faster delivery for when you need it sooner"
    },
    {
      icon: <Package className="h-8 w-8 text-purple-600" />,
      title: "Same Day Delivery",
      time: "Within 24 Hours",
      price: "₹199",
      description: "Available in select cities for urgent orders"
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: "Premium Delivery",
      time: "1-2 Business Days",
      price: "₹149",
      description: "Priority handling with premium packaging"
    }
  ];

  const policies = [
    {
      title: "Free Shipping",
      description: "Free standard shipping on orders above ₹999",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    {
      title: "Secure Packaging",
      description: "All items are carefully packaged to prevent damage",
      icon: <Package className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Order Tracking",
      description: "Real-time tracking updates for all deliveries",
      icon: <MapPin className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Safe Delivery",
      description: "Contactless delivery options available",
      icon: <Shield className="h-5 w-5 text-orange-500" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">Shipping Information</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Fast, reliable, and secure delivery options to get your orders to you quickly and safely.
            </p>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800">Delivery Options</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Delivery Speed</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select from our range of delivery options to suit your timeline and budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shippingOptions.map((option, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-2">{option.price}</p>
                    <p className="text-sm font-medium text-gray-700 mb-3">{option.time}</p>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Policies */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-800">Our Promise</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Shipping Policies</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing the best shipping experience possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {policies.map((policy, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      {policy.icon}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{policy.title}</h3>
                        <p className="text-gray-600">{policy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• All major cities and towns across India</li>
                    <li>• Same day delivery in Mumbai, Delhi, Bangalore</li>
                    <li>• Remote areas may take 7-10 business days</li>
                    <li>• Check pincode availability at checkout</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Orders placed before 2 PM ship same day</li>
                    <li>• Weekend orders ship on Monday</li>
                    <li>• Fragile items require 1-2 extra days</li>
                    <li>• Signature required for orders above ₹5,000</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingInfoPage;
