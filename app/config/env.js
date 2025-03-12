const env = {
  database: 'agenteinteligente', // Nombre de la base de datos
  username: 'agenteinteligente_user', // Usuario de la base de datos
  password: '4zRN1pI4OwyPvX3mjNFHfP4CgQnLc8sm', // Contraseña de la base de datos
  host: 'dpg-cv7fdb52ng1s7385e2dg-a', // Host del servidor PostgreSQL
  dialect: 'postgres', // El dialecto de la base de datos (PostgreSQL)
  pool: {
    max: 5, // Número máximo de conexiones en el pool
    min: 0, // Número mínimo de conexiones en el pool
    acquire: 30000, // Tiempo máximo en ms para intentar una conexión antes de marcar error
    idle: 10000 // Tiempo máximo que una conexión puede estar inactiva antes de ser liberada
  }
};

module.exports = env;
