
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">Tatv</span>
        </Link>
        
        <div className="hidden md:block flex-grow mx-8">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Profile />
        </div>
      </div>
      
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
