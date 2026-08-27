import Order from '../models/Order.js'
import User from '../models/User.js'
// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId, 
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
} 

// User Order Data for frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const orders = await Order.find({ userId })
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
} 

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await Order.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
} 

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus}