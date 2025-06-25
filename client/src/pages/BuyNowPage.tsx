import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductById } from "../data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Tag, Truck, Shield } from "lucide-react";

const BuyNowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  
  const product = id ? getProductById(id) : undefined;
  
  const savedAddresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true
    },
    {
      id: 2,
      name: "Office",
      address: "456 Business Park, Floor 12",
      city: "Mumbai",
      state: "Maharashtra", 
      pincode: "400002",
      isDefault: false
    }
  ];

  const availableCoupons = [
    { code: "SAVE10", discount: 10, minOrder: 500 },
    { code: "FIRST20", discount: 20, minOrder: 1000 },
    { code: "WELCOME15", discount: 15, minOrder: 0 }
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <Button onClick={() => navigate("/")} className="mt-4">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const productPrice = product.price;
  const appliedDiscount = appliedCoupon ? availableCoupons.find(c => c.code === appliedCoupon)?.discount || 0 : 0;
  const discountAmount = (productPrice * appliedDiscount) / 100;
  const deliveryCharge = productPrice > 500 ? 0 : 50;
  const finalPrice = productPrice - discountAmount + deliveryCharge;
  const totalSavings = discountAmount;

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon && productPrice >= coupon.minOrder) {
      setAppliedCoupon(coupon.code);
      setCouponCode("");
    }
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { 
      state: { 
        buyNowProduct: product, 
        selectedAddress: savedAddresses[selectedAddress],
        appliedCoupon,
        finalPrice,
        totalSavings
      } 
    });
  };

  // Get the first image from the array
  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
            <p className="text-gray-600">Review your order and delivery details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product & Address */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-bold">₹{product.price}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Truck className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">
                          {deliveryCharge === 0 ? "Free Delivery" : `₹${deliveryCharge} Delivery`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedAddresses.map((address, index) => (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddress === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedAddress(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{address.name}</span>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{address.address}</p>
                          <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                        </div>
                        <input
                          type="radio"
                          checked={selectedAddress === index}
                          onChange={() => setSelectedAddress(index)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                </CardContent>
              </Card>

              {/* Coupons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-orange-600" />
                    Apply Coupon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        Coupon "{appliedCoupon}" applied! You saved ₹{discountAmount}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Available Coupons:</p>
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="p-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                        onClick={() => setCouponCode(coupon.code)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-sm font-bold">{coupon.code}</span>
                          <span className="text-sm text-green-600">{coupon.discount}% OFF</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {coupon.minOrder > 0 ? `Min order ₹${coupon.minOrder}` : "No minimum order"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Price Breakdown */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Product Price</span>
                      <span>₹{productPrice}</span>
                    </div>
                    
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                        {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{finalPrice}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium text-center">
                        You save ₹{totalSavings}!
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={proceedToCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-center">
                    <Button variant="ghost" onClick={() => navigate(`/product/${product.id}`)}>
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyNowPage;
