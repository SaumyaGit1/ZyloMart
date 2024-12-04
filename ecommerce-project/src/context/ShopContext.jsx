import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
    let cartData =  structuredClone(cartItems);
  
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
        } catch (error) {}
      }
    }
    return tcount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        const headers = {
          Authorization: `Bearer ${token}`, // Correct header format
          "Content-Type": "application/json",
        };
        await axios.post(backendUrl+'/api/cart/update', {
          itemId,
          size,quantity
        }, { headers });
      } catch (error) {
        console.log(error);
        toast.error("Error updating cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const currency = "$";
  const deliveryCharge = 10;

  const getProduct = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
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
  }, [token]);
  
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
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider; // Corrected default export
