import React, { useState } from "react";
import { useContext ,useEffect} from "react";
import ShopContextProvider, { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "../components/Title";

function Order() {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setorderData]=useState([])
  const loadOrderData=async()=>{
    try{
      if(!token){
        return null
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    
      const res=await axios.post(backendUrl+'/api/order/userorders',{},{headers})
      if(res.data.success){
        let allOrdersItem=[]
        res.data.orders.map((order)=>{
        
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <div className="border-t pt-16 mb-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm md:w-1/3">
              <img className="w-16 sm:w-20 " src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-600">
                  <p >
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size:{item.size}</p>
                </div>
                <p className="mt-1">
                  Date:<span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1">
                  Payment:<span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="flex items-center gap-2">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
            <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
