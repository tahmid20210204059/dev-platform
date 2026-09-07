const swaggerJsdoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev Platform API",
      version: "1.0.0",
      description: "Developer community platform API documentation"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: [path.join(__dirname, "../routes/*.js").replace(/\\/g, "/")]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};