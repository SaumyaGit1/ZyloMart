import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Home from "./pages/Home";
import About from "./pages/About";
import Placeorder from "./pages/Placeorder";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import hero from "./components/Hero";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <ToastContainer />
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/cart" element={<Cart />} />r
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/placeorder" element={<Placeorder />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
