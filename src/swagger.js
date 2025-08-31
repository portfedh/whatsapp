const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Salsa Candela WhatsApp API",
      version: "1.0.0",
      description: "API documentation for Salsa Candela WhatsApp App",
    },
    servers: [
      {
        url: "http://localhost:3131",
      },
      {
        url: "https://whatsapp-salsa-candela.up.railway.app",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
