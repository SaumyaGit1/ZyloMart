import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function Searchbar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Update visibility based on the current page (Only in Collection page)
  useEffect(() => {
    if (location.pathname.includes("Collection")) {
      setVisible(true); // Allows search to be shown if the button is pressed
    } else {
      setVisible(false); // Hide search bar outside the collection page
    }
  }, [location]);

  return visible ? (
    <div>
      {showSearch && (
        <div className="border-t border-b bg-gray-50 text-center">
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-inherit text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
          <img
            onClick={() => setShowSearch(false)} // Hide search bar when cross icon is clicked
            className="inline w-3 cursor-pointer"
            src={assets.cross_icon}
            alt="close"
          />
        </div>
      )}
    </div>
  ) : null;
}

export default Searchbar;
