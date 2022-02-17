import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) =>{
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}))

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
}))

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
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({message: "Narudžba nije pronađena!"});
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {id: req.body.id, status: req.body.status, 
            update_time: req.body.update_time, email_address: req.body.email_address};
        
        const updatedOrder = await order.save();
        res.send({message: 'Narudžba plaćena', order: updatedOrder});
    }
    else{
        res.status(404).send({message: 'Narudžba nije pronađena'});
    }
    
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        const deleteOrder = await order.remove();
        res.send({message: 'Narudžba uspješno obrisana', order: deleteOrder});
    }
    else{
        res.status(404).send({message: 'Narudžba nije pronađena'});
    }
}))

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send({message: 'Narudžba uspješno dostavljena', order: updatedOrder});
    }
    else{
        res.status(404).send({message: 'Narudžba nije pronađena'});
    }
}))



export default orderRouter;