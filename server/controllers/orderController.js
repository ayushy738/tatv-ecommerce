import { response } from "express"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from 'razorpay'

const currency = 'INR'
const deliveryCharge = 50


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const placeOrder = async (req, res) => {
    try {
        const userId = req.userId
        const { items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
export const placeOrderStripe = async (req, res) => {

}
export const placeOrderRazorpay = async (req, res) => {
    try {
        const userId = req.userId
        const { items, amount, address } = req.body
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: newOrder._id.toString()
        }

        
        const razorpayOrder = await razorpayInstance.orders.create(options);


        res.json({ success: true, razorpayOrder, orderId: newOrder._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const verifyRazorpay = async (req,res) => {
    try {
        const userId = req.userId
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success: true , message : "Payment Successful"})
        }else{
            res.json({success: false, message: "Payment Failed" })
        }

    } catch (error) {
         console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.error("Error loading orders", error);
        res.json({ success: false, message: error.message })
    }
}
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.error("Error loading orders", error);
        res.json({ success: false, message: error.message })
    }

}
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}