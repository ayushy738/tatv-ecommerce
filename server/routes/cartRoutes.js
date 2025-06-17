import express from 'express';
import { addToCart, getUserCart, updateCartItem,removeCartItem } from '../controllers/cartController.js'; 
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/get',authUser, getUserCart);
cartRouter.post('/add',authUser, addToCart);
cartRouter.post("/update", authUser, updateCartItem);
cartRouter.delete("/remove", authUser, removeCartItem);


export default cartRouter;