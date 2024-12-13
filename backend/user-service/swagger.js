const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    opneapi: '3.0.0',
    info: {
        title: 'user-service-API',
        version: '1.0.0',
        description: 'Swagger documentation for User-Microservice'
    }
}

const options = {
    swaggerDefinition,
    apis: ['./src/controller/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec