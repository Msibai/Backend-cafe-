import { Router } from "express";
import mongoose,{Schema} from 'mongoose';
import crypto from "crypto"
const salt = "pass".toString('hex')

function Encrypt(password){
    let hash = crypto.pbkdf2Sync(password, salt,1000,64,'sha512').toString('hex')
    return hash
}


const userRouter = Router();

const userSchema = new Schema({
    name:{type:String, required:true},
    phoneNumber: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    admin: {type:Boolean, default:false, required:true},
    customer: {type:Boolean, default:false},
    restaurantWorker: {type:Boolean, default:false}

    
})

mongoose.model('users', userSchema)


userRouter.get('/', async(request,response) => {
    const users = await mongoose.models.users.find()
    response.json(users)
})

userRouter.post('/', async(request,response) =>{
     const user = new mongoose.models.users()
    user.name = request.body.name
    user.phoneNumber = request.body.phoneNumber
    user.email = request.body.email
    user.password = Encrypt(request.body.password)
    user.admin = request.body.admin
    user.customer = request.body.customer
    user.restaurantWorker = request.body.restaurantWorker
    await user.save()
    response.json({"User":"Created"})
})

export default userRouter

