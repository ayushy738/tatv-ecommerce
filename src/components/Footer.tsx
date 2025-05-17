
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Home } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Badge } from "@/components/ui/badge";

const Footer: React.FC = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  return (
    <footer className="sticky bottom-0 z-40 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <nav className="container flex h-14 items-center justify-around">
        <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/orders" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide h-5 w-5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
            <path d="M10 9H8"></path>
          </svg>
          <span className="text-xs mt-1">Orders</span>
        </Link>
        
        <Link to="/chat" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">ChatBot</span>
        </Link>
        
        <Link to="/cart" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
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
    </footer>
  );
};

export default Footer;
