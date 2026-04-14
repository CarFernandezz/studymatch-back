require('dotenv').config({ path: './src/.env' }); //Carga variables

const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app=express();

app.use(cors());//permite la conexion con react
app.use(express.json()); //permite el uso de json

//base de datos 
 mongoose.connect(process.env.MONGO_URI)//conecta a la base de datos
.then(()=>console.log('Conectado a MongoDB')) //mensaje de conexion exitosa
.catch((err)=>console.error('Error al conectar a MongoDB:',err)); //mensaje de error

//rutas
const userRoutes=require('./routes/authRoutes');//importa rutas de autenticacion
app.use('/api/users',userRoutes); //ruta para usuarios
// app.use('/api/matches',require('./routes/matchRoutes')); //ruta para coincidencias (archivo no existe)
app.use('/api/careers',require('./routes/careersRoutes')); //ruta para carreras

//inicializacion del servidor
const PORT=process.env.PORT || 3000; //puerto de conexion
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`); //mensaje de inicio del servidor
});


