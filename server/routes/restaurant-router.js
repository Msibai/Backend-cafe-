import { Router } from "express";
import mongoose, { Schema } from 'mongoose';

const restaurantRouter = Router();

const restaurantSchema = new Schema({
  location: String,
  phoneNumber: String,
  email: String,
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menus'
  }]
});

mongoose.model('restaurant', restaurantSchema);

restaurantRouter.get('/', async (req, res) => {
 
  try {
    const restaurant = await mongoose.models.restaurant.find().populate('menu');
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

restaurantRouter.post('/', async (req, res) => {
  try {
    const restaurant = new mongoose.model('restaurant')(req.body);
    restaurant.location = req.body.location;
    restaurant.phoneNumber = req.body.phoneNumber;
    restaurant.email = req.body.email;
    restaurant.menu = req.body.menu;
    await restaurant.save();
    res.status(201).json({ "result": "created" });
  } catch (error) {
    res.status(401).json({ "error": error.message });
  }
});

export default restaurantRouter;





