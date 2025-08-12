const express = require('express');
const router = express.Router();
const tareas = require('../datos/tareas-datos');

// Obtener todos los episodios
router.get('/', (req, res) => {
    res.json(tareas);
});s


// Obtener un episodio por ID
router.get('/:id', (req, res) => {
    const tarea = tareas.find(ta => ta.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send('Tarea no encontrada');
    res.json(tarea);
});

// Eliminar una tarea por ID
router.delete('/:id', (req, res) => {
    const index = tareas.findIndex(ta => ta.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Tarea no encontrada');
    }
    const tareaEliminada = tareas.splice(index, 1);
    res.json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada[0] });
});

// Exportar el router
module.exports = router;