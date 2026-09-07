const successResponse = (res, statusCode, data, message) => {
	return res.status(statusCode).json({
		success: true,
		data,
		message
	});
};

const errorResponse = (res, statusCode, message, errors) => {
	return res.status(statusCode).json({
		success: false,
		message,
		errors
	});
};

module.exports = {
	successResponse,
	errorResponse
};
