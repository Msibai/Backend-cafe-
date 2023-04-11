import { Router } from 'express';
import mongoose, { Schema } from 'mongoose';

const orderRouter = Router();

const orderSchema = new Schema({
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'menus',
		},
	],

	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'restaurants',
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	
});

mongoose.model('orders', orderSchema);

orderRouter.get('/', async (req, res) => {
	const orders = await mongoose.models.orders.find();
	res.json(orders);
});

orderRouter.post('/', async (req, res) => {
	try {
		const order = new mongoose.models.orders(req.body);
		order.items = req.body.items;
		order.restaurant = req.body.restaurant;
		order.customer = req.body.customer;
		await order.save();
		res.status(201);
		res.json({ result: 'created' });
	} catch (err) {
		res.status(401);
		res.json({ error: err.message });
	}
});

orderRouter.get('/:id', async (req, res) => {
	const orders = await mongoose.models.orders
		.find({
			customer: req.params.id,
		})
		.populate('customer')
		.populate('items');

	res.json(orders);
});

export default orderRouter;
