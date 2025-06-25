
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
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tatv
                </span>
              </Link>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Your premium destination for everything trendy and essential. Shop the future with confidence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-xs md:text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <span className="text-xs md:text-sm font-bold">t</span>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-xs md:text-sm font-bold">i</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">FAQ</Link></li>
                <li><Link to="/shipping-info" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Shipping Info</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Track Orders</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/search?q=women" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Women</Link></li>
                <li><Link to="/search?q=shoes" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Sports Shoes</Link></li>
                <li><Link to="/search?q=slippers" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Sliders & Flip Flops</Link></li>
                <li><Link to="/search?q=watch" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Electronic Accessories</Link></li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4">Legal & Policies</h3>
              <ul className="space-y-2">
                <li><Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Refund Policy</Link></li>
                <li><Link to="/shopping-assistant" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Help Center</Link></li>
                <li><Link to="/shopping-assistant" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Live Chat</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2025 Tatv. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="sticky bottom-0 z-40 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <nav className="container flex h-16 items-center justify-around px-2">
          <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/orders" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Orders</span>
          </Link>
          
          <Link to="/shopping-assistant" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
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
