const user=require('../models/user');//saca user de BD

//match

exports.findMatches = async(req,res)=>{
    try{
        const {userId,materias,anio}=req.body

        const matches=await user.find({
            _id:{$ne:userId},
             //excluye al usuario actual de los resultados

            anio:anio,

            materias:{$in:materias}//busca usuarios que tengan al menos una materia en comun

        }) .populate("carrera"); 

        res.json(matches);

    }
    catch(error){
        error="Error al encontrar coincidencias";
        res.status(500).json({error});
    }
};