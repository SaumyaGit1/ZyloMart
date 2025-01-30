import express from 'express'
import {placeOrders,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe,verifyRazorpay} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'
const orderRouter=express.Router()
//Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
//Payment Status
orderRouter.post('/place',authUser,placeOrders)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
//user Feature
orderRouter.post('/userorders',authUser,userOrders)
//verify Stripe
orderRouter.post('/verifyStripe',authUser,verifyStripe)
//verify Stripe
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
export default orderRouter