import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { sendEmail } from '../utils/mailer.js';
import Stripe from 'stripe'
import Razorpay from 'razorpay'
//global variables
const currency='usd';
const deliveryCharge=10;
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const placeOrders = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);

    const savedOrder = await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Fetch user email (from the user model)
    const user = await userModel.findById(userId);
    const userEmail = user.email;

    // Fetch admin email from .env
    const adminEmail = process.env.ADMIN_EMAIL;

    // Format address into a human-readable string
    const addressString = `${address.street}, ${address.city}, ${address.state} ${address.zipcode}`;

    // Prepare email subject and text for user
    const userSubject = 'Order Confirmation - Zylomart';
    const userText = `Dear ${user.name},\n\nYour order has been placed successfully.\nOrder ID: ${savedOrder._id}\nAmount: $${amount}\nDelivery Address: ${addressString}\n\nThank you for shopping with us!`;

    // Send email to user
    await sendEmail(userEmail, userSubject, userText);

    // Prepare email subject and text for admin
    const adminSubject = `New Order Placed - Order ID: ${savedOrder._id}`;
    const adminText = `Admin,\n\nA new order has been placed.\nOrder ID: ${savedOrder._id}\nUser: ${user.name}\nAmount: $${amount}\nDelivery Address: ${addressString}\n\nPlease review the order details in the admin panel.`;

    // Send email to admin
    await sendEmail(adminEmail, adminSubject, adminText);

    res.status(201).json({ success: true, message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

const placeOrderStripe=async (req,res)=>{
  try{
    const { userId, items, amount, address } = req.body;
        // Validate items
        if (!items || !Array.isArray(items)) {
          return res.status(400).json({ success: false, message: "Invalid items data" });
        }
    
        console.log("Items:", items); // Debugging log
    const { origin }= req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
   
    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency, // Replace with your currency
        product_data: {
          name: item.name,
          
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency, // Replace with your currency
        product_data: {
          name: 'Delivery Charges',
          
        },
        unit_amount:deliveryCharge * 100,// Stripe expects amount in cents
      },
      quantity: 1,
    })
    const session = await stripe.checkout.sessions.create({
      
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?session=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?session=false&orderId=${newOrder._id}`,
    });
    res.json({success:true,session_url:session.url})
  }
  catch(err){
    console.log(err)
    res.json({success:false,message:err.message})
  }

}
//verify Stripe
const verifyStripe= async (req,res) =>{
  const {orderId,success,userId}=req.body
  try{
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success:true});
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  }catch(err){
    console.log(err)
    res.json({success:false,message:err.message})
  }
} 

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Invalid items data" });
    }

    console.log("Items:", items); // Debugging log

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const order = {
      amount: Math.round(amount * 100), // Convert to paise for Razorpay
      currency: 'INR',
      receipt: newOrder._id.toString()
    };

    console.log("Creating Razorpay order with data:", order); // Debugging log

    // Create Razorpay order
    razorpayInstance.orders.create(order, (err, orderResponse) => {
      if (err) {
        console.error("Razorpay order creation error:", err);
        return res.status(500).json({ success: false, message: "Razorpay order creation failed" });
      }
      console.log("Razorpay order created:", orderResponse);
      res.json({ success: true, orderId: orderResponse.id });
    });
  } catch (err) {
    console.error("Unexpected error in placeOrderRazorpay:", err);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};
// verify-rajorpay 
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, orderId, userId } = req.body;

    // Fetch the order info from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Check if the order status is 'paid'
    if (orderInfo.status === 'paid') {
      // Payment verified
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      // Payment verification failed
      await orderModel.findByIdAndDelete(orderId);
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    console.error('Razorpay verification error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
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
export { verifyRazorpay,verifyStripe,placeOrders,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}