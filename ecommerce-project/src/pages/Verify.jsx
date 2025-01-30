import React from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext,useEffect } from 'react'

import axios from 'axios'

const Verify = () => {
    const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext)
    const [searchParams,setSearchParams]=useSearchParams()
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
    const verifyPayment=async()=>{
        try{
            if(!token){
                return null
            }
            const headers = {
                Authorization: `Bearer ${token}`, // Pass the token properly
                "Content-Type": "application/json",
              };
              const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`, 
                { success, orderId }, 
                { headers }
              );
            if(response.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }    
    console.log(token);
    useEffect(() => {
        if (token) {
          verifyPayment();
        }
      }, [token]);
  return (
    <div>Verify</div>
  )
}

export default Verify