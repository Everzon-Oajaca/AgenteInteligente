const db = require('../config/db.config.js');
const Proyecto = db.Proyecto;

exports.create = (req, res) => {
  let proyecto = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    completada: req.body.completada || false,
    fecha_creacion: req.body.fecha_creacion || new Date(),
    fecha_vencimiento: req.body.fecha_vencimiento,
    prioridad: req.body.prioridad || 'media',
    asignado_a: req.body.asignado_a,
    categoria: req.body.categoria,
    Costo_proyecto: req.body.Costo_proyecto,
    Pagado: req.body.Pagado || false
  };

  try {
    Proyecto.create(proyecto).then(result => {
      res.status(200).json({
        message: "Proyecto creado con éxito con id = " + result.id,
        proyecto: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Falló!",
      error: error.message
    });
  }
}

exports.retrieveAllProjects = (req, res) => {
  Proyecto.findAll()
    .then(proyectos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los proyectos con éxito!",
        proyectos: proyectos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error.message
      });
    });
}

exports.getProjectById = (req, res) => {
  let projectId = req.params.id;
  Proyecto.findByPk(projectId)
    .then(proyecto => {
      if (proyecto) {
        res.status(200).json({
          message: "Se obtuvo con éxito el proyecto con id = " + projectId,
          proyecto: proyecto
        });
      } else {
        res.status(404).json({
          message: "No se encontró el proyecto con id = " + projectId,
          error: "404"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error.message
      });
    });
}

exports.pagination = (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let limit = parseInt(req.query.limit) || 10;
  const offset = page * limit;

  Proyecto.findAndCountAll({ limit: limit, offset: offset })
    .then(data => {
      const totalPages = Math.ceil(data.count / limit);
      res.status(200).json({
        message: "¡La paginación se completó!",
        data: {
          totalItems: data.count,
          totalPages: totalPages,
          limit: limit,
          currentPageNumber: page + 1,
          currentPageSize: data.rows.length,
          proyectos: data.rows
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error -> No se puede completar la solicitud de paginación.",
        error: error.message,
      });
    });
}

exports.updateById = async (req, res) => {
  try {
    let projectId = req.params.id;
    let proyecto = await Proyecto.findByPk(projectId);

    if (!proyecto) {
      res.status(404).json({
        message: "No se encontró el proyecto para actualizar con id = " + projectId,
        error: "404"
      });
    } else {
      let updatedObject = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completada: req.body.completada,
        fecha_vencimiento: req.body.fecha_vencimiento,
        prioridad: req.body.prioridad,
        asignado_a: req.body.asignado_a,
        categoria: req.body.categoria,
        Costo_proyecto: req.body.Costo_proyecto,
        Pagado: req.body.Pagado
      };

      let result = await Proyecto.update(updatedObject, { returning: true, where: { id: projectId } });

      res.status(200).json({
        message: "Actualización exitosa del proyecto con id = " + projectId,
        proyecto: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el proyecto con id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let projectId = req.params.id;
    let proyecto = await Proyecto.findByPk(projectId);

    if (!proyecto) {
      res.status(404).json({
        message: "No existe un proyecto con id = " + projectId,
        error: "404",
      });
    } else {
      await proyecto.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del proyecto con id = " + projectId,
        proyecto: proyecto,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el proyecto con id = " + req.params.id,
      error: error.message,
    });
  }
}
