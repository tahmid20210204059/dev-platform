const jwt = require("jsonwebtoken");
const {
  errorResponse
} = require("../utils/apiResponse");


const authMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return errorResponse(
        res,
        401,
        "Authorization token required"
      );
    }


    const match = authHeader.match(/^Bearer\s+(\S+)$/);


    if (!match) {
      return errorResponse(
        res,
        401,
        "Invalid authorization format"
      );
    }

    const token = match[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    req.user = decoded;

    next();


  } catch (error) {

    return errorResponse(
      res,
      401,
      "Invalid or expired token"
    );

  }
};


module.exports = authMiddleware;