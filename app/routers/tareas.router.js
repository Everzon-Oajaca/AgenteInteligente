const express = require('express');
const router = express.Router();
const proyectos = require('../controllers/tareas.controller');

// Crear un proyecto
router.post('/api/proyectos/create', proyectos.create);

// Obtener todos los proyectos
router.get('/api/proyectos/all', proyectos.retrieveAllProjects);

// Obtener un proyecto por su ID
router.get('/api/proyectos/onebyid/:id', proyectos.getProjectById);

// Paginación de proyectos
router.get('/api/proyectos/pagination', proyectos.pagination);

// Actualizar un proyecto por su ID
router.put('/api/proyectos/update/:id', proyectos.updateById);

// Eliminar un proyecto por su ID
router.delete('/api/proyectos/delete/:id', proyectos.deleteById);

module.exports = router;
