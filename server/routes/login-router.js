import Router from 'express';
const loginRouter = Router();
import mongoose from 'mongoose';
import crypto from 'crypto';
const salt = 'pass'.toString('hex');

function Encrypt(password) {
	let hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return hash;
}

loginRouter.post('/', async (request, response) => {
	let user = await mongoose.models.users.findOne({
		email: request.body.email,
		password: Encrypt(request.body.password),
	});
	if (user) {
		response.status(201);
		request.session.user = user;
		response.json({ user });
	} else {
		response.status(401);
		response.json({ loggedIn: false });
	}
});


loginRouter.get('/', async (request, response) => {
	if (request.session?.user) {
		let user = await mongoose.models.users.findOne({
			email: request.session.user.email,
			password: request.session.user.password,
		});
		if (user) {
			response.json({
				name: request.session.user.name,
				email: request.session.user.email,
				admin: request.session.user.admin,
				restaurantWorker: request.session.user.restaurantWorker,
				loggedIn: true,
			});
			return;
		}
	}

	response.json({ loggedIn: false });
});

loginRouter.delete('/', async (request, response) => {
	delete request.session.user
	response.json({ loggedIn: false });
});

export default loginRouter;
