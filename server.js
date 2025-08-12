const express = require('express');
const app = express();
const port = 3000;

// Importar el enrutador general
const apiRouter = require('./rutas/index');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Usar el enrutador general bajo el prefijo /api
app.use('/api', apiRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});