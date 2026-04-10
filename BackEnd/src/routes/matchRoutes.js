const express=require('express');

const router=express.Router();

const matchingControllers=require('../controllers/matchingControllers'); //importa controladores de matching

router.post('/',matchingControllers.findMatches); //ruta para encontrar coincidencias

module.exports=router;