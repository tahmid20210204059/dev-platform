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
    ],

    components: {
      schemas: {
        ApiSuccess: {
          type: "object",
          required: ["success", "data", "message"],
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            data: {
              nullable: true
            },
            message: {
              type: "string",
              example: "Request completed successfully"
            }
          }
        },
        ApiError: {
          type: "object",
          required: ["success", "statusCode", "message", "errors"],
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            statusCode: {
              type: "integer",
              example: 400
            },
            message: {
              type: "string",
              example: "Validation failed"
            },
            errors: {
              type: "array",
              items: {}
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: [
    path.join(__dirname, "../routes/*.js").replace(/\\/g, "/")
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};