import Router from "express";
import mongoose, { Schema } from "mongoose";
const menusRouter = Router();

const menuSchema = new Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  pricePerItem: { type: Number, required: true },
});

mongoose.model("menus", menuSchema);

menusRouter.get("/", async (request, response) => {
  const menus = await mongoose.models.menus.find();
  response.json(menus);
});

menusRouter.get("/:id", async (request, response) => {
  const menuItem = await mongoose.models.menus.findById(request.params.id);
  response.json(menuItem);
});

menusRouter.post("/", async (request, response) => {
  if (request.session.user && request.session.user.admin) {
    const menu = new mongoose.models.menus();
    menu.itemName = request.body.itemName;
    menu.description = request.body.description;
    menu.pricePerItem = request.body.pricePerItem;
    await menu.save();
    response.json({ message: "Menu item successfully added" });
    return;
  } else {
    response.status(403);
    response.json({ error: "Only admin can add new menu item" });
  }
});

menusRouter.delete("/:id", async (request, response) => {
  if (response.session?.user.admin) {
    await mongoose.models.menus.findByIdAndDelete(request.params.id);
    response.json({ deleted: "menu-item" });
  } else {
    response.status(403);
    response.json({ error: "only admin can delete a menu.item" });
  }
});

menusRouter.patch("/:id", async (request, response) => {
  if (request.session?.user.admin) {
    const menu = await mongoose.models.menus.findByIdAndUpdate(
      request.params.id
    );
    menu.itemName = request.body.itemName ?? menu.itemName;
    menu.description = request.body.description ?? menu.description;
    menu.pricePerItem = request.body.pricePerItem ?? menu.pricePerItem;
    await menu.save();
  } else {
    response.status(403);
    response.json({ error: "unauthorized" });
    return;
  }
  response.json({ Menu: "Updated" });
});

menusRouter.put("/:id", async (request, response) => {
  if (request.session.user && request.session.user.admin) {
    const menu = await mongoose.models.menus.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    await menu.save();
    response.json({ message: "Menu item successfully updated!" });
    return;
  } else {
    response.status(403);
    response.json({ error: "You must be an admin to update a menu item" });
  }
});

export default menusRouter;
