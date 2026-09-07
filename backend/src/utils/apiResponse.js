const successResponse = (
  res,
  statusCode = 200,
  data = null,
  message = ""
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
};


const errorResponse = (
  res,
  statusCode = 400,
  message = "Something went wrong",
  errors = []
) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors
  });
};


module.exports = {
  successResponse,
  errorResponse
};