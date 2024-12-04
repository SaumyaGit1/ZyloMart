import React, { useState } from "react";
import axios from "axios";
import {backendUrl} from '../App'
import { toast } from "react-toastify";
const Login = ({settoken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try{
        e.preventDefault();
        const response=await axios.post(backendUrl+'/api/user/admin',{email,password})
        console.log(response);
        if(response.data.success){
            settoken(response.data.token)
        }else{
            toast.error(response.data.message)
        }
    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }
    }catch (err){
        console.log(err)
        toast.error(err)
    }

  
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
  export default Login