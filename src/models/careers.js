const mongoose = require('mongoose');


const careerSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },

    anios: [{
        anio: Number,
        materias: [{
            nombre: String,
            codigo: String
        }]
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Carrera', careerSchema);