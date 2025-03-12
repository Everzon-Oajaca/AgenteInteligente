module.exports = (sequelize, Sequelize) => {
    const Pregunta = sequelize.define('pregunta', {
        texto: {
            type: Sequelize.TEXT, // Contenido de la pregunta
            allowNull: false,
        },
        respuesta: {
            type: Sequelize.TEXT, // Respuesta a la pregunta
            allowNull: true, // Puede estar vacía inicialmente si no hay respuesta
        },
        explicacion_pendiente: {
            type: Sequelize.BOOLEAN, // Indica si se necesita explicación adicional
            defaultValue: false,
        },
        fecha_creacion: {
            type: Sequelize.DATE, // Fecha en que se guardó la pregunta
            defaultValue: Sequelize.NOW,
        },
        fecha_actualizacion: {
            type: Sequelize.DATE, // Última modificación de la pregunta
            allowNull: true,
        },
        usuario_creador: {
            type: Sequelize.STRING, // Usuario que hizo la pregunta
            allowNull: true,
        },
        categoria: {
            type: Sequelize.STRING, // Clasificación opcional
            allowNull: true,
        },
        relevancia: {
            type: Sequelize.ENUM('baja', 'media', 'alta'), // Nivel de importancia
            defaultValue: 'media',
        },
        eliminada: {
            type: Sequelize.BOOLEAN, // Si la pregunta fue marcada como obsoleta
            defaultValue: false,
        }
    });
  
    return Pregunta;
  };
  