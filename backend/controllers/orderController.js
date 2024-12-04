import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrders = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
  
      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        status: false,
        date: Date.now(),
      }
      const newOrder=new orderModel(orderData)
  
      const savedOrder = await newOrder.save();
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.status(201).json({ success: true, message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ success: false, message: 'Failed to place order' });
    }
  };
const placeOrderStripe=async (req,res)=>{
    
}
const placeOrderRazorpay=async (req,res)=>{
    
}
const allOrders=async (req,res)=>{
  try {
    

    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
const userOrders = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const orders = await orderModel.find({ userId });
      if (!orders.length) {
        return res.status(404).json({ success: false, message: 'No orders found for this user' });
      }
  
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user orders' });
    }
  };
const updateStatus=async (req,res)=>{
  try {
    
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status});
    res.status(200).json({ success: true, message:'Status Updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export {placeOrders,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}