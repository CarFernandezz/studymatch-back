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
        required:true,
    },

    materias: [{
        nombre: String,
        estado: {
            type: String,
            enum: ['aprobada', 'cursando', 'pendiente' ,'recursando', 'no cursada'],
        },
        esAyudante: {
        type: Boolean,
        default: false
        },
        nivel:{
            type: String,
            enum: ["basico", "intermedio", "avanzado"]
        }
            
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('User',userSchema); //exportacion del modelo de datos para el usuario