const { json } = require('express');
const careers=require('../models/careers');//importacion del modelo de datos para las carreras

//Se obtiene la lista de todas las carreras

exports.getAllcareers=async(req,res)=>{
    try{
    const allCareers=await careers.find();//busqueda de todas las carreras en la base de datos
    res.json(allCareers);
    }
    catch(error){
        res.status(500).json({
            error:"Error al obtener las carreras",
            details:error.message
        });
    }
};

//carrera id 

exports.getcarrersById=async(req,res)=>{
    try{
        const career=await careers.findById(req.params.id);
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
        const {nombre,anios}=req.body;//obtencion de los datos de la carrera 

        const newCareer = new careers({
            nombre,
            anios
        });

        await newCareer.save();

        res.status(201).json({
            message:"carrera creada exitosamente",
            carrera: newCareer
        });

    }
    catch(error){
        res.status(500).json({
            error:"Error al crear la carrera",
            details:error.message
        });
    }


};