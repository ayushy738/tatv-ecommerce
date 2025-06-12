import React from 'react';
import { NavLink } from 'react-router-dom';
import orderIcon from '../assets/order_icon.png';
import addIcon from '../assets/add_icon.png';
import '../index.css';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-25 md:w-52 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div className="pt-6 px-4 space-y-3">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <img src={addIcon} alt="Add Icon" className="w-5 h-5" />
          <span className="hidden md:inline">Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <img src={orderIcon} alt="List Icon" className="w-5 h-5" />
          <span className="hidden md:inline">List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <img src={orderIcon} alt="Order Icon" className="w-5 h-5" />
          <span className="hidden md:inline">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
