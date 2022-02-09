import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";
import { isAuth } from "../util.js";

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) =>{
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Korpa je prazna'});
    }
    else{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            pdvPrice: req.body.pdvPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        })
        const createdOrder = await order.save();
        res.status(201).send({message: 'Nova narudžba je kreirana', order: createdOrder});
    }
}))

export default orderRouter;