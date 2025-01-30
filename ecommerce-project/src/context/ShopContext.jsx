import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { products as sampleProducts } from "../assets/assets";
export const ShopContext = createContext(); // Named export for context
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false); // Hidden by default
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Deep clone cartItems safely
    let cartData = structuredClone(cartItems);

    // Update cart data locally
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData); // Update state with new cart

    // API call to sync with backend
    // Retrieve token from localStorage
    if (token) {
      try {
        const headers = {
          Authorization: `Bearer ${token}`, // Correct header format
          "Content-Type": "application/json",
        };

        // Log the request data to check before sending
        console.log("Request Body:", { itemId, size });

        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers }
        );

        console.log("API Response:", response.data); // Log the response

        // Check response for success
        if (response.data.success) {
          toast.success("Item added to cart!");
        } else {
          toast.error(response.data.message || "Failed to add to cart");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);

        // Check if it's a network error
        if (error.response) {
          // Server responded with a non-2xx code
          console.error("Response error:", error.response.data);
          toast.error(error.response.data.message || "Failed to add to cart");
        } else if (error.request) {
          // No response received from server
          console.error("No response received:", error.request);
          toast.error("Network error. Please check your connection.");
        } else {
          // Error setting up the request
          console.error("Request error:", error.message);
          toast.error("Error setting up request");
        }
      }
    } else {
      toast.error("User not authenticated. Please log in.");
    }
  };

  const getcartItem = () => {
    let tcount = 0;
    for (const Items in cartItems) {
      for (const Item in cartItems[Items]) {
        try {
          if (cartItems[Items][Item] > 0) {
            tcount += cartItems[Items][Item];
          }
        } catch (error) { }
      }
    }
    return tcount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

 
  
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
  
    // Ensure item exists before modifying
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      if (quantity === 0) {
        // Remove the specific size from the item
        delete cartData[itemId][size];
  
        // If no sizes remain for this item, remove the entire item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }
  
      setCartItems(cartData); // Update state
  
      if (token) {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
  
          const response = await axios.post(`${backendUrl}/api/cart/update`, {
            itemId,
            size,
            quantity
          }, { headers });
  
          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to update cart");
          } else {
            console.log('Cart updated successfully:', response.data);
          }
        } catch (error) {
          console.error("Error updating cart:", error.response || error.message);
          toast.error(error.response ? error.response.data.message : "Error updating cart");
        }
      }
    }
  };
  
  

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
  
      if (!itemInfo) {
        console.warn(`Product with ID ${items} not found in products list`);
        continue; // Skip the iteration if product is not found
      }
  
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error("Error getting cart amount");
        }
      }
    }
    return totalAmount;
  };
  

  const currency = "$";
  const deliveryCharge = 10;

  const getProduct = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        // Merge backend products with sample products
        const mergedProducts = [...response.data.products, ...sampleProducts];
        setProducts(mergedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);
  const removeItem = async (itemId, size) => {
    console.log("🗑 Removing item:", { itemId, size });
  
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      delete cartData[itemId][size];
  
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // Remove the item completely if all sizes are removed
      }
  
      setCartItems(cartData); // Update UI optimistically
  
      if (token) {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
  
          console.log("🔹 Sending DELETE request to:", `${backendUrl}/api/cart/remove`);
          console.log("🔹 Request Data:", { itemId, size });
  
          const response = await axios.post(`${backendUrl}/api/cart/remove`, { itemId, size }, { headers });
  
          console.log("✅ API Response:", response.data);
  
          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to remove item");
          }
  
          toast.success("Item removed from cart");
        } catch (error) {
          console.error("❌ Error removing item:", error);
          toast.error(error.response?.data?.message || "Error removing item");
        }
      }
    }
  };
  
  const getUserCart = async (token) => {
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers });
      if (response.data.success) {
        setCartItems(response.data.cartData || {}); // Ensure cartData is always an object
      } else {
        toast.error(response.data.message || "Failed to fetch cart data");
      }
    } catch (error) {
      if (error.response?.status === 403) {

        toast.error("Session expired . Please log in again.");

      } else {
        toast.error(error.response?.data?.message || "Network or server error");
      }
    }
  };

  const value = {
    currency,
    deliveryCharge,
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getcartItem,
    updateQuantity,
    removeItem,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider; // Corrected default export