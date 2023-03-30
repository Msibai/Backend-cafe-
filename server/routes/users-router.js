import { Router } from "express";
import mongoose,{Schema} from 'mongoose';

import Encrypt from '../utils/get-hash.js'





const userRouter = Router();

const userSchema = new Schema({
    name:{type:String, required:true},
    phoneNumber: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    admin: {type:Boolean, default:false, required:true},
    restaurantWorker: {type:Boolean, default:false}

    
})

mongoose.model('users', userSchema)


userRouter.get('/', async(request,response) => {
    const users = await mongoose.models.users.find()
    response.json(users)
})

userRouter.get('/:id', async(request,response) =>{
    const user = await mongoose.models.users.findById(request.params.id)
    response.json(user)
})

userRouter.post('/', async(request,response) =>{
     const user = new mongoose.models.users()
    user.name = request.body.name
    user.phoneNumber = request.body.phoneNumber
    user.email = request.body.email
    user.password = Encrypt(request.body.password)
    user.admin = request.body.admin
    user.restaurantWorker = request.body.restaurantWorker
    await user.save()
    response.json({"User":"Created"})
})

userRouter.delete('/:id', async(request,response) =>{
    if(request.session?.user && request.session.user.admin){
        const user = await mongoose.models.users.findByIdAndDelete(request.params.id)
        response.json({"User":"Deleted"})
    } else {
        response.status(403)
        response.json({"Error":"Unauthorized"})
    }
})


userRouter.patch('/:id', async(request,response)=>{
    console.log(request.session?.user.admin)
    if(request.session?.user){
        const user = await mongoose.models.users.findById(request.params.id)
        user.name = request.body.name ?? user.name
        user.phoneNumber = request.body.phoneNumber ?? user.phoneNumber
        user.email = request.body.email ?? user.email
        user.password = Encrypt(request.body.password) ?? user.password
        await user.save()}

        else{
            response.status(403)
            response.json({"Error":"Unauthorized"})
            return
        }
         response.json({"User":"Updated"})
})



export default userRouter

