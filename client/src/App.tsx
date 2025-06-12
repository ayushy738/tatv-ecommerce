
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AppContextProvider } from "./context/AppContext";

// Import Pages
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import BuyNowPage from "./pages/BuyNowPage";
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import CategoryPage from "./pages/CategoryPage";
import ShoppingAssistantPage from "./pages/ShoppingAssistantPage";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastContainer />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            
            
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path='/verify-account' element={<EmailVerify/>} />
                <Route path='/reset-password' element={<ResetPassword/>} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/buy-now/:id" element={<BuyNowPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/shipping-info" element={<ShippingInfoPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/shopping-assistant" element={<ShoppingAssistantPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            
            
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AppContextProvider>
  </QueryClientProvider>
);

export default App;
