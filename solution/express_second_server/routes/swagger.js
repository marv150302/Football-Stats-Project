const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Meta Information about our API
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Football API',
            version: '1.0.0',
            description: 'A simple API documentation for a Football application',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

module.exports = setupSwagger;
