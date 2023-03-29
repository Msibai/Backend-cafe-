import express, { response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const api = express();
const port = 3030;
dotenv.config();

api.use(express.json());

const conn = `mongodb+srv://mukhtarsibai:${process.env.dbPass}@cluster0.n8wdklc.mongodb.net/?retryWrites=true&w=majority`;

api.listen(port, () => {
	console.log(`http://localhost:${port}`);
	mongoose.connect(conn, { dbName: 'java22' });
});

api.get('/', async (request, response) => {
	response.send('Hello');
});
