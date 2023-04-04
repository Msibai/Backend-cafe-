const handleDuplicateKeyError = (error, response) => {
	const field = Object.keys(error.keyValue);
	const code = 409;
	const err = `An account with that ${field} already exists.`;
	response.status(code).send({ messages: err, fields: field });
};

const handleValidationError = (error, response) => {
	let errors = Object.values(error.errors).map((el) => el.message);
	let fields = Object.values(error.errors).map((el) => el.path);
	let code = 400;

	if (errors.length > 1) {
		const formattedErrors = errors.join(' ');
		response.status(code).send({ messages: formattedErrors, fields: fields });
	} else {
		response.status(code).send({ messages: errors, fields: fields });
	}
};

export default (error, request, response, next) => {
	try {
		if (error.name === 'ValidationError')
			return (error = handleValidationError(error, response));
		if (error.code && error.code == 11000)
			return (error = handleDuplicateKeyError(error, response));
	} catch (error) {
		response.status(500).send('An unknown error occured.');
	}
};
