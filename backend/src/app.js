const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { errorResponse } = require("./utils/apiResponse");

const { swaggerUi, swaggerSpec } = require("./config/swagger");


const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));


app.use(express.json());


app.use(
  "/uploads",
  express.static("uploads")
);


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.use(routes);


app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return errorResponse(res, 400, "Uploaded file is too large");
  }

  if (error.message === "Invalid media format") {
    return errorResponse(res, 400, error.message);
  }

  if (error.type === "entity.parse.failed") {
    return errorResponse(res, 400, "Invalid request body");
  }

  return errorResponse(res, 500, "Internal server error");
});


module.exports = app;