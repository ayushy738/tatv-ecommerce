
import React from "react";
import { Link } from "react-router-dom";


const Navbar = ({ setToken }) => {


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/favicon.svg" // Place 'logo.svg' inside public/ folder
              alt="Tatv Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <button
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 shadow" onClick={() => {
              setToken("");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
