import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'

function Placeorder() {
  // State to manage form inputs
  const {backendUrl,token,cartItems,getCartAmount,setCartItems,deliveryCharge,
    products}=useContext(ShopContext)
  const [formData, setFormData] = useState({
   
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [method, setMethod] = useState("cod"); // State for payment method
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (example functionality)

  const onClickHandler=async (event)=>{
    event.preventDefault()
    try{
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount() + deliveryCharge
      }
      switch (method) {
        case "stripe":
          
          break;
        case "razorpay":
          
          break;
        case "cod":
          const res = await axios.post(`${backendUrl}/api/orders/place`,orderData,{header:{token}});
          if(res.data.success){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(res.data.message)
          }
          break;
        default:
          
          break;
      }
    }catch(err){
      console.log(err)
      res.json({success:false,message:err.message})
    }
  }
  return (
    <form onSubmit={onClickHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t mb-10">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Zip Code"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
      </div>

      {/* Right Side */}
      <div className="flex-grow sm:flex sm:justify-end mt-8 sm:mt-0">
        <div className="w-full sm:max-w-[480px]">
          <CartTotal />
          <div className="mt-12">
            <Title text1="PAYMENT" text2="METHOD" />

            {/* Payment Method Container */}
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-4 justify-start">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-4 border p-4 cursor-pointer rounded-lg ${
                  method === "stripe" ? "border-green-400" : "border-gray-300"
                }`}
              >
                <span
                  className={`w-3 h-3 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></span>
                <img
                  className="h-4"
                  src={assets.stripe_logo}
                  alt="Stripe Logo"
                />
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-4 border p-4 cursor-pointer rounded-lg ${
                  method === "razorpay" ? "border-green-400" : "border-gray-300"
                }`}
              >
                <span
                  className={`w-3 h-3 border rounded-full ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></span>
                <img
                  className="h-4"
                  src={assets.razorpay_logo}
                  alt="Razorpay Logo"
                />
                <p className="text-gray-500 text-xs font-medium"></p>
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-4 border p-4 cursor-pointer rounded-lg ${
                  method === "cod" ? "border-green-400" : "border-gray-300"
                }`}
              >
                <span
                  className={`w-3 h-3 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></span>
                <p className="text-gray-500 text-xs font-medium">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
               
                className="bg-slate-700 text-white px-16 py-3 text-sm rounded-lg"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Placeorder;
