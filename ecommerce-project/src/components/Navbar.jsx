import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [Visible, setVisible] = useState(false);

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <img src={assets.logo} className="w-24" alt="logo" />

      {/* Navigation Links */}
      <ul
        className={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 hidden-below-764`}
      >
        <NavLink
          to="/"
          className="text-black-300 rounded-md px-3 py-2 text-md font-medium"
        >
          Home
        </NavLink>
        <NavLink
          to="/Collection"
          className="text-black-300 rounded-md px-3 py-2 text-md font-medium"
        >
          Collection
        </NavLink>
        <NavLink
          to="/about"
          className="text-black-300 rounded-md px-3 py-2 text-md font-medium"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="text-black-300 rounded-md px-3 py-2 text-md font-medium"
        >
          Contact
        </NavLink>
      </ul>

      {/* Menu icons */}
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col py-3 px-5 gap-2 w-36 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Order</p>
              <p className="cursor-pointer hover:text-black">Log out</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:block md:hidden"
          alt="menu"
        />
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            Visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="py-2 pl-6 border"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="py-2 pl-6 border"
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="py-2 pl-6 border"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="py-2 pl-6 border"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
