import express, { Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import loginRouter from './routes/login-router.js';
import usersRouter from './routes/users-router.js';
import menusRouter from './routes/menus-router.js';
import session from 'express-session';
import errorController from './controller/errorController.js';

const api = express();
const port = 3030;
dotenv.config();

api.use(express.json());

api.use(
	session({
		secret: 'hello jack',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 365 * 24 * 60 * 60 * 1000,
		},
	})
);

const conn = `mongodb+srv://mukhtarsibai:hNntlwXGrEf6qUnM@cluster0.n8wdklc.mongodb.net/?retryWrites=true&w=majority`;

api.listen(port, () => {
	console.log(`http://localhost:${port}`);
	mongoose.connect(conn, { dbName: 'java22' });
});

const router = Router();
router.use('/api/login', loginRouter);
router.use('/api/users', usersRouter);
router.use('/api/menus', menusRouter);
api.use(router);
api.use(errorController);
