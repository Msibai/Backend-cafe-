import { Router } from "express";
import mongoose, { Schema } from 'mongoose';



const orderRouter = Router();

const orderSchema = new Schema({
    orderNumber: { type: String, required: true},
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menus'
    }],

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

})



mongoose.model('orders', orderSchema)

orderRouter.get('/', async (req, res) => {

    const orders = await mongoose.models.orders.find();
    res.json(orders);

})

orderRouter.post('/', async (req, res) => {
    try {
     
      const order = new mongoose.models.orders(req.body);
      order.items = req.body.items
      order.restaurant = req.body.restaurant
      order.customer = req.body.customer
      await order.save();
      res.status(201) 
      res.json({"result": "created"})
    } catch (err) {
        res.status(401)
        res.json({"error": err.message})

    }
  });

  orderRouter.patch('/:id', async(request,response)=>{
    const order = await mongoose.models.orders.findByIdAndUpdate(request.params.id)
    order.orderNumber = request.body.orderNumber ?? order.orderNumber
    order.items = request.body.items ?? order.items
    order.restaurant = request.body.restaurant ?? order.restaurant
    order.customer = request.body.customer ?? order.customer

    await order.save()
    response.json({"order" : "Updated"})
})


export default orderRouter




