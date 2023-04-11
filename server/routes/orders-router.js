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

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  orderNumber: {
    type: String,
    required: true,
  },
});

mongoose.model("orders", orderSchema);

orderRouter.get("/", async (req, res) => {
  const orders = await mongoose.models.orders.find();
  res.json(orders);
});

orderRouter.post("/", async (req, res) => {
  try {
    const order = new mongoose.models.orders(req.body);
    order.items = req.body.items;
    order.customer = req.body.customer;
    order.orderNumber = req.body.orderNumber;
    await order.save();
    res.status(201);
    res.json({ result: "created" });
  } catch (err) {
    res.status(401);
    res.json({ error: err.message });
  }
});

orderRouter.get("/:id", async (request, response) => {
  try {
    const order = await mongoose.models.orders
      .findById(request.params.id)
      .populate("customer", "name")
      .populate("items");

    response.json(order);
  } catch (error) {
    response.status(404).json({ error: "Order not found" });
  }
});

export default orderRouter;
