const express = require('express');
const router = express.Router();
const preguntas = require('../controllers/preguntaController.js');

// Crear una nueva pregunta
router.post('/api/preguntas/create', preguntas.create);

// Consultar una pregunta y obtener respuesta
router.post('/api/preguntas/consultar', preguntas.responderPregunta);

// Registrar o actualizar una respuesta
router.post('/api/preguntas/responder', preguntas.registrarRespuesta);

// Obtener todas las preguntas
//router.get('/api/preguntas/all', preguntas.retrieveAll);

// Obtener una pregunta por su ID
//router.get('/api/preguntas/onebyid/:id', preguntas.getById);

// Paginación de preguntas
//router.get('/api/preguntas/pagination', preguntas.pagination);

// Actualizar una pregunta por su ID
//router.put('/api/preguntas/update/:id', preguntas.updateById);

// Eliminar una pregunta por su ID (marcar como eliminada)
//router.delete('/api/preguntas/delete/:id', preguntas.deleteById);

// Eliminar preguntas obsoletas o vacías
router.delete('/api/preguntas/clean', preguntas.limpiarPreguntas);

module.exports = router;
