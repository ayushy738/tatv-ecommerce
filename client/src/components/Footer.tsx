
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Home, Package, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Badge } from "@/components/ui/badge";

const Footer: React.FC = () => {
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const cartCount = getCartCount();
  
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tatv
                </span>
              </Link>
              <p className="text-gray-400 mb-4">
                Your premium destination for everything trendy and essential. Shop the future with confidence.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <span className="text-sm font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-sm font-bold">i</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/shipping-info" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors">Track Orders</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/search?q=women" className="text-gray-400 hover:text-white transition-colors">Women</Link></li>
                <li><Link to="/search?q=shoes" className="text-gray-400 hover:text-white transition-colors">Sports Shoes</Link></li>
                <li><Link to="/search?q=slippers" className="text-gray-400 hover:text-white transition-colors">Sliders & Flip Flops</Link></li>
                <li><Link to="/search?q=watch" className="text-gray-400 hover:text-white transition-colors">Electronic Accessories</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/shopping-assistant" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors">Returns and Exchanges</Link></li>
                <li><Link to="/shopping-assistant" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link to="/shopping-assistant" className="text-gray-400 hover:text-white transition-colors">Care Instructions</Link></li>
                <li><Link to="/shopping-assistant" className="text-gray-400 hover:text-white transition-colors">Live Chat</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tatv. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="sticky bottom-0 z-40 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <nav className="container flex h-16 items-center justify-around">
          <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/orders" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Orders</span>
          </Link>
          
          <Link to="/chat" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs mt-1">ChatBot</span>
          </Link>
          
          <Link to="/wishlist" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <div className="relative">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 min-w-4 p-0 flex items-center justify-center rounded-full text-[10px]">
                  {wishlistItems.length}
                </Badge>
              )}
            </div>
            <span className="text-xs mt-1">Wishlist</span>
          </Link>
          
          <Link to="/cart" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 min-w-4 p-0 flex items-center justify-center rounded-full text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Footer;
