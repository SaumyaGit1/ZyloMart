import React from "react";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 pl-6 sm:pl-10">
        {" "}
        {/* Added padding */}
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">🔥BEST SELLER</p>
          </div>
          <h1 className="prata-regular text-3xl lg:text-5xl sm:py-3 leading-relaxed">
            ✨ Fresh & Trending
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">🛍️ SHOP INN</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
}

export default Hero;
