require('dotenv').config(); //Carga variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());//permite la conexion con react
app.use(express.json()); //permite el uso de json

//base de datos 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err))


//rutas
const authRoutes = require('./routes/authRoutes');//importa rutas de autenticación
app.use('/api/auth', authRoutes); //ruta para autenticación
app.use('/api/careers', require('./routes/careersRoutes')); //ruta para carreras
app.use('/api/user', require('./routes/userRoutes')); //ruta para usuario

//inicializacion del servidor
const PORT = process.env.PORT || 3000; //puerto de conexion
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); //mensaje de inicio del servidor
});


