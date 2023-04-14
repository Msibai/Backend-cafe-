import { Router } from "express";
import mongoose, { Schema } from "mongoose";

const orderRouter = Router();

const orderSchema = new Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menus",
    },
  ],

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: { Pending:{default: true , type: Boolean} , 
  Accepted:{default: false , type: Boolean},
  Declined:{default: false , type: Boolean},
  Ready: {default:false, type: Boolean}},

  pickUpTime: { type: String 

  }
});

export const myOrders = mongoose.model("orders", orderSchema);

orderRouter.get("/", async (req, res) => {
  const orders = await mongoose.models.orders.find();
  res.json(orders);
});

orderRouter.post("/", async (req, res) => {
  try {
    const order = new mongoose.models.orders(req.body);
    order.items = req.body.items;
    order.restaurant = req.body.restaurant;
    order.customer = req.body.customer;
    await order.save();
    res.status(201);
    res.json({ result: "created" });
  } catch (err) {
    res.status(401);
    res.json({ error: err.message });
  }
});

orderRouter.get("/:id", async (req, res) => {
  const order = await mongoose.models.orders
    .findById(req.params.id)
    .populate("customer")
    .populate("items");

  res.json(order);
});

orderRouter.delete("/:id", async (request, response) => {
	if (request.session.user && request.session.user.restaurantWorker) {
	  await mongoose.models.orders.findByIdAndDelete(request.params.id);
	  response.json({ message: "Successfully deleted!" });
	} else {
	  response.status(403);
	  response.json({ error: "You must be a worker to delete an order" });
	}
  });
  
  orderRouter.put("/:id", async (request, response) => {
	if (request.session.user && request.session.user.restaurantWorker) {
	  const order = await mongoose.models.orders.findByIdAndUpdate(
		request.params.id,
		request.body
	  );
	  await order.save();
  
	  response.json({ Order: "Handled" });
	}
  });
  

export default orderRouter;
