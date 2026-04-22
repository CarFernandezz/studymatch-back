const Career = require('../models/careers');//importacion del modelo de datos para las carreras

//Se obtiene la lista de todas las carreras

exports.getAllcareer=async(req,res)=>{
    try{
    const careers=await Career.find();
    res.json(careers);
    }
    catch(error){
        res.status(500).json({
            error:"Error al obtener las carreras",
            details:error.message
        });
    }
};

//carrera id 

exports.getcarrerById=async(req,res)=>{
    try{
        const career=await Career.findById(req.params.id);
        if(!career){
            return res.status(404).json({
                error:"Carrera no encontrada"
            });

        }

        res.json(career);
    }
    catch(error){
        res.status(500).json({
            error:"Error al obtener la carrera",
            details:error.message
        });
    }

};

//crear carrera

exports.createcareer=async(req,res)=>{
    try{
        const {nombre,anios}=req.body;

        const newCareer = new Career({
            nombre,
            anios
        });

        await newCareer.save();

        res.status(201).json({
            message:"carrera creada exitosamente",
            career: newCareer
        });

    }
    catch(error){
        res.status(500).json({
            error:"Error al crear la carrera",
            details:error.message
        });
    }


};