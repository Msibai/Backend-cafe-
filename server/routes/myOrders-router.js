import { Router } from 'express';
import {myOrders} from './orders-router.js';




const myOrderRouter = Router();
myOrderRouter.get("/:id", async (req, res) => {
    const order = await myOrders
      .find({customer: req.params.id})
      .populate("customer")
      .populate("items");
  
    res.json(order);
  });

  export default myOrderRouter;