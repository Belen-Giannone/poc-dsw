const express = require('express');
const router = express.Router();
const tareas = require('../datos/tareas-datos');

// Obtener todos los episodios
router.get('/', (req, res) => {
    res.json(tareas);
});


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


// Crear una nueva tarea
router.post('/', (req, res) => {
    const { id, materia, fechaentrega, numerotarea } = req.body;
    if (!id || !materia || !fechaentrega || !numerotarea) {
        return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }
    const nuevaTarea = {
        id: parseInt(id),
        materia,
        fechaentrega,
        numerotarea: parseInt(numerotarea)
    };
    tareas.push(nuevaTarea);
    res.status(201).json({ mensaje: 'Tarea creada', tarea: nuevaTarea });
});


// Actualizar atributos de una tarea por ID
router.patch('/:id', (req, res) => {
    const tarea = tareas.find(ta => ta.id === parseInt(req.params.id));
    if (!tarea) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    const { materia, fechaentrega, numerotarea } = req.body;
    if (materia !== undefined) tarea.materia = materia;
    if (fechaentrega !== undefined) tarea.fechaentrega = fechaentrega;
    if (numerotarea !== undefined) tarea.numerotarea = parseInt(numerotarea);
    res.json({ mensaje: 'Tarea actualizada', tarea });
});

// Exportar el router
module.exports = router;