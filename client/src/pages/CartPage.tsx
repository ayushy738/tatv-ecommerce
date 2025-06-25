
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { requireAuth } = useAuthCheck();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!requireAuth('view your cart')) {
      return;
    }
  }, []);
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart to proceed.
            </p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart items */}
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const productImage = Array.isArray(item.product.image) ? item.product.image[0] : item.product.image;
                  
                  return (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                    >
                      {/* Product image */}
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={productImage}
                          alt={item.product.name}
                          className="w-full sm:w-24 h-24 object-cover rounded"
                        />
                      </Link>
                      
                      <div className="flex-grow">
                        {/* Product details */}
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <Link to={`/product/${item.product.id}`}>
                              <h3 className="font-medium">{item.product.name}</h3>
                            </Link>
                            {item.size && (
                              <p className="text-sm text-muted-foreground">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <span className="font-medium">
                              ₹{((item.product.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Quantity and actions */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-2 py-1 text-lg"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-lg"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Order summary */}
            <div>
              <div className="border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
