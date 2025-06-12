
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, Smartphone, Truck, Lock } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { requireAuth } = useAuthCheck();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!requireAuth('proceed to checkout')) return;
  }, []);
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    
    clearCart();
    navigate("/");
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart to checkout.
            </p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your order safely and securely</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <Input id="firstName" placeholder="Enter first name" required />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <Input id="lastName" placeholder="Enter last name" required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <Input id="address" placeholder="Enter your street address" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City *
                        </label>
                        <Input id="city" placeholder="Enter city" required />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">
                          State *
                        </label>
                        <Input id="state" placeholder="Enter state" required />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                          ZIP Code *
                        </label>
                        <Input id="zipCode" placeholder="Enter ZIP code" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment-method"
                          value="credit-card"
                          className="h-4 w-4 mr-3"
                          defaultChecked
                        />
                        <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard, Rupay</p>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment-method"
                          value="upi"
                          className="h-4 w-4 mr-3"
                        />
                        <Smartphone className="h-5 w-5 mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-sm text-gray-500">PhonePe, Google Pay, Paytm</p>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment-method"
                          value="cod"
                          className="h-4 w-4 mr-3"
                        />
                        <Truck className="h-5 w-5 mr-3 text-orange-600" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive</p>
                        </div>
                      </label>
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600 text-white"
                >
                  Place Order - ₹{total.toFixed(2)}
                </Button>
              </form>
            </div>
            
            {/* Order summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => {
                      // Get the first image from the array
                      const itemImage = Array.isArray(item.product.image) ? item.product.image[0] : item.product.image;
                      
                      return (
                        <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                          <img
                            src={itemImage}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.product.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>Qty: {item.quantity}</span>
                              {item.size && <span>• Size: {item.size}</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">
                              ₹{((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator />
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="flex items-center gap-2">
                        {shipping === 0 ? (
                          <>
                            <Badge variant="secondary" className="text-xs">FREE</Badge>
                            <span className="line-through text-gray-400">₹10.00</span>
                          </>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (7%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Security Info */}
                  <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
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

export default CheckoutPage;
