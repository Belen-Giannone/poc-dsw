const express = require('express');
const app = express();
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Importar el enrutador general
const apiRouter = require('./rutas/index');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Configuración de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API REST POC',
        version: '1.0.0',
        description: 'Documentación de la API REST POC',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./rutas/*.js'], // Archivos donde están las rutas
};

const swaggerSpec = swaggerJSDoc(options);

// Ruta para la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar el enrutador general bajo el prefijo /api
app.use('/api', apiRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});