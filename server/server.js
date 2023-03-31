import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menusRouter from './routes/menus-router.js';
import userRouter from './routes/users-router.js';
import session from 'express-session'
import loginRouter from './routes/login-routes.js';
import { Router} from 'express';
import logIn from './routes/login-routes2.js';


const router = Router()

router.use('/', logIn)
app.use(router)


const api = express();
const port = 3030;
dotenv.config();

api.use(express.json());

api.use(session({
    secret: 'hello jack',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 365*24*60*60*1000
    }
}))




const conn = `mongodb+srv://mukhtarsibai:${process.env.dbPass}@cluster0.n8wdklc.mongodb.net/?retryWrites=true&w=majority`;

api.listen(port, () => {
	console.log(`http://localhost:${port}`);
	mongoose.connect(conn, { dbName: 'java22' });
});


api.use('/users',userRouter)
api.use('/menus',menusRouter)
api.use('/login', loginRouter)

