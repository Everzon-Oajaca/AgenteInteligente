const db = require('../config/db.config.js');
const Pregunta = db.Pregunta;

// Crear una nueva pregunta
exports.create = async (req, res) => {
  try {
    let nuevaPregunta = {
      texto: req.body.texto,
      respuesta: req.body.respuesta || null,
      explicacion_pendiente: req.body.respuesta ? false : true,
      fecha_creacion: new Date(),
      usuario_creador: req.body.usuario_creador || "Anónimo",
      categoria: req.body.categoria || null,
      relevancia: req.body.relevancia || 'media'
    };

    let pregunta = await Pregunta.create(nuevaPregunta);
    res.status(200).json({
      message: "Pregunta creada con éxito.",
      pregunta: pregunta,
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Error al crear la pregunta!",
      error: error.message
    });
  }
};



const { Op } = require("sequelize");

// Consultar una pregunta y obtener su respuesta (con búsqueda flexible)
exports.responderPregunta = async (req, res) => {
  try {
    let { texto } = req.body;
    texto = texto.toLowerCase().trim(); // Normalizar el texto de búsqueda

    // Buscar la pregunta exacta
    let pregunta = await Pregunta.findOne({
      where: {
        texto: { [Op.iLike]: texto },
        eliminada: false
      }
    });

    // Si no la encuentra, busca preguntas que contengan la palabra clave
    if (!pregunta) {
      pregunta = await Pregunta.findOne({
        where: {
          texto: { [Op.iLike]: `%${texto}%` },
          eliminada: false
        }
      });
    }

    // Si la encuentra, devuelve la respuesta
    if (pregunta) {
      return res.status(200).json({
        message: "Respuesta encontrada.",
        pregunta: pregunta.texto,
        respuesta: pregunta.respuesta
      });
    } else {
      return res.status(200).json({
        message: "No tengo una respuesta para esa pregunta. ¿Quieres registrarla?",
        pregunta: texto,
        necesita_respuesta: true
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar la pregunta.",
      error: error.message
    });
  }
};











// Registrar o actualizar una respuesta
exports.registrarRespuesta = async (req, res) => {
  try {
    const { texto, respuesta } = req.body;

    let pregunta = await Pregunta.findOne({ where: { texto: texto } });

    if (pregunta) {
      pregunta.respuesta = respuesta;
      pregunta.explicacion_pendiente = false;
      await pregunta.save();

      return res.status(200).json({
        message: "Respuesta registrada con éxito.",
        pregunta: pregunta.texto,
        respuesta: pregunta.respuesta
      });
    } else {
      let nuevaPregunta = await Pregunta.create({
        texto: texto,
        respuesta: respuesta,
        explicacion_pendiente: false
      });

      return res.status(201).json({
        message: "Nueva pregunta y respuesta registrada.",
        pregunta: nuevaPregunta.texto,
        respuesta: nuevaPregunta.respuesta
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar la respuesta.",
      error: error.message
    });
  }
};




/*
// Obtener todas las preguntas
exports.retrieveAll = async (req, res) => {
  try {
    let preguntas = await Pregunta.findAll({ where: { eliminada: false } });
    res.status(200).json({
      message: "¡Preguntas obtenidas con éxito!",
      preguntas: preguntas
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Error al obtener las preguntas!",
      error: error.message
    });
  }
};

// Obtener una pregunta por ID
exports.getById = async (req, res) => {
  try {
    let pregunta = await Pregunta.findByPk(req.params.id);
    if (pregunta) {
      res.status(200).json({
        message: "Pregunta encontrada.",
        pregunta: pregunta
      });
    } else {
      res.status(404).json({
        message: "Pregunta no encontrada.",
        error: "404"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar la pregunta.",
      error: error.message
    });
  }
};

// Paginación de preguntas
exports.pagination = async (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let limit = parseInt(req.query.limit) || 10;
  const offset = page * limit;

  try {
    let data = await Pregunta.findAndCountAll({ 
      where: { eliminada: false },
      limit: limit, 
      offset: offset 
    });

    const totalPages = Math.ceil(data.count / limit);
    res.status(200).json({
      message: "¡Paginación realizada con éxito!",
      data: {
        totalItems: data.count,
        totalPages: totalPages,
        limit: limit,
        currentPageNumber: page + 1,
        currentPageSize: data.rows.length,
        preguntas: data.rows
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en la paginación.",
      error: error.message,
    });
  }
};

// Actualizar una pregunta por ID
exports.updateById = async (req, res) => {
  try {
    let pregunta = await Pregunta.findByPk(req.params.id);
    if (!pregunta) {
      res.status(404).json({
        message: "No se encontró la pregunta para actualizar.",
        error: "404"
      });
    } else {
      let updatedData = {
        texto: req.body.texto || pregunta.texto,
        respuesta: req.body.respuesta || pregunta.respuesta,
        explicacion_pendiente: req.body.respuesta ? false : pregunta.explicacion_pendiente,
        fecha_actualizacion: new Date(),
        usuario_creador: req.body.usuario_creador || pregunta.usuario_creador,
        categoria: req.body.categoria || pregunta.categoria,
        relevancia: req.body.relevancia || pregunta.relevancia,
      };

      await Pregunta.update(updatedData, { where: { id: req.params.id } });

      res.status(200).json({
        message: "Pregunta actualizada con éxito.",
        pregunta: updatedData
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la pregunta.",
      error: error.message
    });
  }
};

// Eliminar una pregunta por ID (marcar como eliminada)
exports.deleteById = async (req, res) => {
  try {
    let pregunta = await Pregunta.findByPk(req.params.id);
    if (!pregunta) {
      res.status(404).json({
        message: "No se encontró la pregunta para eliminar.",
        error: "404"
      });
    } else {
      await Pregunta.update({ eliminada: true }, { where: { id: req.params.id } });
      res.status(200).json({
        message: "Pregunta eliminada con éxito.",
        pregunta: pregunta
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la pregunta.",
      error: error.message
    });
  }
};
*/
// Filtrar preguntas obsoletas o vacías
exports.limpiarPreguntas = async (req, res) => {
  try {
    let preguntasEliminadas = await Pregunta.destroy({
      where: {
        [db.Sequelize.Op.or]: [
          { respuesta: null },
          { respuesta: "" },
          { eliminada: true }
        ]
      }
    });

    res.status(200).json({
      message: `Se eliminaron ${preguntasEliminadas} preguntas obsoletas o vacías.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al limpiar preguntas obsoletas.",
      error: error.message
    });
  }
};
