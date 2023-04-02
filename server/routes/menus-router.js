import Router from 'express'
import mongoose, {Schema} from "mongoose";
const menusRouter = Router()

const menuSchema = new Schema ({
   itemName : {type: String, required: true},
   description: {type: String},
   pricePerItem :{type: Number , required:true}
})

mongoose.model('menus', menuSchema )

menusRouter.get ('/', async(request,response)=> {
    try{
    const menus = await mongoose.models.menus.find()
    response.json(menus);
} catch (error){
    response.status(500).json({message: error.message });
}
});

menusRouter.post('/', async(request,response) => {
     if(request.session?.user && request.session.user.admin){ 
        try { const menu = new mongoose.models.menus()
             menu.itemName = request.body.itemName
             menu.description = request.body.description
             menu.pricePerItem = request.body.pricePerItem
             await menu.save() 
             response.json({message: "Menu item successfully added"}) } 
             catch(error) { 
                response.status(403)
                response.send({message : error})
             }}
            else{
                response.status(403)
                response.json({error : "Only admin can add a menu item"})
            } })

menusRouter.delete('/:id', async(request,response)=>{
    if(response.session?.user.admin){
  await mongoose.models.menus.findByIdAndDelete(request.params.id )
    response.json({"deleted" : "menu-item"})}
    else{
        response.status(403)
        response.json({"error": "only admin can delete a menu.item"})
    }
})

menusRouter.patch('/:id', async(request,response)=>{
    if(request.session?.user.admin){
    const menu = await mongoose.models.menus.findByIdAndUpdate(request.params.id)
    menu.itemName = request.body.itemName ?? menu.itemName
    menu.description = request.body.description ?? menu.description
    menu.pricePerItem = request.body.pricePerItem ?? menu.pricePerItem
    await menu.save()}
    else{
        response.status(403)
        response.json({"error": "unauthorized"})
        return
    }
    response.json({"Menu" : "Updated"})
})


export default menusRouter