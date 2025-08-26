const express = require('express');
const router = express.Router();
const tareas = require('../datos/tareas-datos');

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags:
 *       - Tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   materia:
 *                     type: string
 *                   fechaentrega:
 *                     type: string
 *                   numerotarea:
 *                     type: integer
 */
// Obtener todos los episodios
router.get('/', (req, res) => {
    res.json(tareas);
});


// Obtener un episodio por ID
/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 materia:
 *                   type: string
 *                 fechaentrega:
 *                   type: string
 *                 numerotarea:
 *                   type: integer
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', (req, res) => {
    const tarea = tareas.find(ta => ta.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send('Tarea no encontrada');
    res.json(tarea);
});


// Eliminar una tarea por ID
/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 tarea:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     materia:
 *                       type: string
 *                     fechaentrega:
 *                       type: string
 *                     numerotarea:
 *                       type: integer
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', (req, res) => {
    const index = tareas.findIndex(ta => ta.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Tarea no encontrada');
    }
    const tareaEliminada = tareas.splice(index, 1);
    res.json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada[0] });
});


// Crear una nueva tarea
/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags:
 *       - Tareas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               materia:
 *                 type: string
 *               fechaentrega:
 *                 type: string
 *               numerotarea:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 tarea:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     materia:
 *                       type: string
 *                     fechaentrega:
 *                       type: string
 *                     numerotarea:
 *                       type: integer
 *       400:
 *         description: Faltan datos requeridos
 */
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
/**
 * @swagger
 * /api/tareas/{id}:
 *   patch:
 *     summary: Actualiza atributos de una tarea por ID
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               materia:
 *                 type: string
 *               fechaentrega:
 *                 type: string
 *               numerotarea:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 tarea:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     materia:
 *                       type: string
 *                     fechaentrega:
 *                       type: string
 *                     numerotarea:
 *                       type: integer
 *       404:
 *         description: Tarea no encontrada
 */
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