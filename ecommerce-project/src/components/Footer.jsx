import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className="bg-gray-100 w-full border border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className=" px-4 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5 mt-10 text-sm">
          <div>
            <img src={assets.logo} className="mb-5 w-28" alt="" />
            <p className="w-full md:w-2/3 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. .
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">Get In Touch</p>
            <ul className="flex flex-col text-gray-700 gap-1">
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col text-gray-700 gap-1">
              <li>+1-212-456-7892</li>
              <li>contact@Zylomart.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2024 Zylomart. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
