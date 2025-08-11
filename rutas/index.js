const express = require('express');
const router = express.Router();

const tareasrutas= require('./tareas');

router.use('/tareas', tareasrutas);

//para ver si anda el router
router.get('/', (req, res) => {
    res.send('¡Bienvenido!');
});


module.exports = router;