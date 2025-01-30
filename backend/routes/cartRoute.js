import express from 'express';
import { addToCart, getUserCart, removeCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/authUser.js';
const cartRoute = express.Router();

cartRoute.post('/get',authUser ,getUserCart);
cartRoute.post('/add',authUser ,addToCart);
cartRoute.post('/update', authUser,updateCart);
cartRoute.post('/remove', authUser,removeCart);

export default cartRoute;