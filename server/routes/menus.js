import Router from 'express'
import mongoose, {Schema} from "mongoose";
const menusRouter = Router()

const menuSchema = new Schema ({
   itemName : String,
   description: String,
   pricePerItem : Number
})

mongoose.model('menus', menuSchema )

menusRouter.get ('/', async(req,res)=>{
    const menus = await mongoose.models.menus.find()
    res.json(menus)
})

menusRouter.post('/', async(req,res) => {
    const menu = new mongoose.models.menus()
    menu.itemName = req.body.itemName
    menu.description = req.body.description
    menu.pricePerItem = req.body.pricePerItem
    await menuItems.save()
    res.json({"menu": "created"})
})

menusRouter.delete('/:id', async(req,res)=>{
  await mongoose.models.menus.findByIdAndDelete(req.params.id )
    res.json({"deleted" : "menu-items"})
})


export default menusRouter