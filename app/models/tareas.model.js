module.exports = (sequelize, Sequelize) => {
  const Proyecto = sequelize.define('proyecto', {
      titulo: {
          type: Sequelize.STRING,
          allowNull: false, // Nombre breve, obligatorio
      },
      descripcion: {
          type: Sequelize.TEXT, // Información detallada, opcional
          allowNull: true,
      },
      completada: {
          type: Sequelize.BOOLEAN, // Estado del proyecto, por defecto false
          defaultValue: false,
      },
      fecha_creacion: {
          type: Sequelize.DATE, // Fecha de creación asignada automáticamente
          defaultValue: Sequelize.NOW,
      },
      fecha_vencimiento: {
          type: Sequelize.DATE, // Fecha límite, opcional
          allowNull: true,
      },
      prioridad: {
          type: Sequelize.ENUM('baja', 'media', 'alta'), // Nivel de prioridad
          defaultValue: 'media',
      },
      asignado_a: {
          type: Sequelize.STRING, // Responsable del proyecto, opcional
          allowNull: true,
      },
      categoria: {
          type: Sequelize.STRING, // Clasificación, opcional
          allowNull: true,
      },
      Costo_proyecto: {
          type: Sequelize.FLOAT, // Monto del proyecto
          allowNull: false,
      },
      Pagado: {
          type: Sequelize.BOOLEAN, // Estado de pago
          defaultValue: false,
      }
  });

  return Proyecto;
}
