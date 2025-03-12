const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const librosRouter = require('./app/routers/preguntaRouter.js'); // Única ruta que queda
const db = require('./app/config/db.config.js');

// Sincronizar la base de datos y las tablas sin eliminarlas ni recrearlas
db.sequelize.sync().then(() => {
  console.log('Las tablas se sincronizaron correctamente sin eliminar ni recrear');
});

// Configuración de CORS para permitir solicitudes desde localhost:3000
//const corsOptions = {

  //origin: 'http://localhost:3000',
  //origin: 'http://localhost:3000',
 // optionsSuccessStatus: 200
//};
//app.use(cors(corsOptions));

const corsOptions = {
  origin: '*', // Permitir acceso desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));



// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/', librosRouter); // Ruta para libros

// Ruta raíz de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Configuración del servidor
const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App escuchando en http://%s:%s", host, port);
});
