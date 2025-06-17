
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Heart, Menu, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const cartCount = getCartCount();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
              Tatv
            </span>
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-grow mx-6 lg:mx-8 max-w-2xl">
            <SearchBar />
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Shopping Assistant - Desktop */}
            <Link 
              to="/shopping-assistant" 
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200 transition-colors duration-200"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Assistant</span>
            </Link>
            
            {/* Wishlist - Desktop */}
            <Link to="/wishlist" className="hidden md:flex relative items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-gray-600 hover:text-red-500 transition-colors" />
              {wishlistItems.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-4 md:h-5 md:min-w-5 p-0 flex items-center justify-center rounded-full text-[10px] md:text-xs">
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>
            
            {/* Cart - Desktop */}
            <Link to="/cart" className="hidden md:flex relative items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-gray-600 hover:text-blue-500 transition-colors" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-4 md:h-5 md:min-w-5 p-0 flex items-center justify-center rounded-full text-[10px] md:text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
            
            <Profile />
            
            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
