const mongoose = require('mongoose'); //importacion de mongoose para crear el modelo de datos

const userSchema=new mongoose.Schema({ //creacion del esquema de datos para el usuario
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true
    },

    nombre: {
        type: String,
        required: true
    },

    carrera:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
        required: true
    },

    anio:{
        type:Number,
        required:true
    },

    materias: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('User',userSchema); //exportacion del modelo de datos para el usuario
