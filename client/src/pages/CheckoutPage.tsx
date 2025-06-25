
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { AppContent } from "../context/AppContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, Smartphone, Truck, Lock, Currency } from "lucide-react";
import { getProducts, products } from "../data/products";
import axios from "axios";

// Add Razorpay type to window for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}
interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, setCartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
  }

  interface ChangeEventType extends React.ChangeEvent<HTMLInputElement> { }

  const onChangeHandler = (event: ChangeEventType) => {
    const name = event.target.name as keyof FormData;
    const value = event.target.value;
    setFormData((data: FormData) => ({ ...data, [name]: value }));
  };
  const initPay = (order: RazorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: RazorpayPaymentResponse) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { Authorization: `Bearer ${token}` } })
          if (data.success) {
            setCartItems([])
            navigate('/orders')
          }
        } catch (error) {
          console.log(error)
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to fetch user cart",
            variant: "destructive",
          });
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const { requireAuth } = useAuthCheck();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContent);
  const delivery_fee = 50;

  React.useEffect(() => {
    if (!requireAuth('proceed to checkout')) return;
  }, []);

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping ;

  const [method, setMethod] = useState<string>("razorPay");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let orderItems = cartItems.map(item => {
        const itemInfo = structuredClone(products.find(product => product.id === item.product.id));
        if (itemInfo) {
          itemInfo.sizes = [item.size];
          (itemInfo as any).quantity = item.quantity;
          return itemInfo;
        }
        return null;
      })

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee
      }

      switch (method) {

        //api calls on COD
        case 'cod':
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          )

          if (response.data.success) {
            setCartItems([])
            navigate('/orders')
          } else {
            console.log("Error")
          }
          break;

        case 'razorPay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { Authorization: `Bearer ${token}` } })
          console.log(responseRazorpay.data)
          if (responseRazorpay.data.success) {
            const { razorpayOrder } = responseRazorpay.data;
            initPay(razorpayOrder);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch user cart",
        variant: "destructive",
      });
    }
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
                        <Input onChange={onChangeHandler} name="firstName" value={formData.firstName} id="firstName" placeholder="Enter first name" required />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <Input onChange={onChangeHandler} name="lastName" value={formData.lastName} id="lastName" placeholder="Enter last name" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input onChange={onChangeHandler} name="email" value={formData.email} id="email" placeholder="Enter Email Address" required type="email" />
                    </div>

                    <div>
                      <label htmlFor="street" className="block text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <Input onChange={onChangeHandler} name="street" value={formData.street} id="street" placeholder="Enter your street address" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City *
                        </label>
                        <Input onChange={onChangeHandler} name="city" value={formData.city} id="city" placeholder="Enter City" required />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">
                          State *
                        </label>
                        <Input onChange={onChangeHandler} name="state" value={formData.state} id="state" placeholder="Enter State" required />
                      </div>

                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                          ZIP Code *
                        </label>
                        <Input onChange={onChangeHandler} name="zipcode" value={formData.zipcode} id="zipcode" placeholder="Enter ZIP code" required type="number" />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium mb-2">
                          Country *
                        </label>
                        <Input onChange={onChangeHandler} name="country" value={formData.country} id="country" placeholder="Enter Country Name" required />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone *
                        </label>
                        <Input onChange={onChangeHandler} name="phone" value={formData.phone} id="phone" placeholder="Enter Phone Nummber" required type="number" />
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
                    <div className="grid grid-cols-1 gap-3">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment-method"
                          value="razorPay"
                          className="h-4 w-4 mr-3"
                          checked={method === "razorPay"}
                          onChange={() => setMethod("razorPay")}
                        />
                        <Smartphone className="h-5 w-5 mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Razor Pay</p>
                          <p className="text-sm text-gray-500">Razorpay UPI Payment</p>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment-method"
                          value="cod"
                          className="h-4 w-4 mr-3"
                          checked={method === "cod"}
                          onChange={() => setMethod("cod")}
                        />
                        <Truck className="h-5 w-5 mr-3 text-orange-600" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive</p>
                        </div>
                      </label>
                    </div>
                  </CardHeader>

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
                              ₹{(item.product.price * item.quantity).toFixed(2)}
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
                            <span className="line-through text-gray-400">₹100.00</span>
                          </>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </span>
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
