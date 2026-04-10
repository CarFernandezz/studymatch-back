const express=require('express');

const router =express.Router();

const careersController=require('../controllers/careerControllers'); //importa controladores de carreras

router.get('/',careersController.getAllcareers); //ruta para obtener todas las carreras

router.get('/:id',careersController.getcarrersById); //ruta para obtener carrera por ID

router.post('/',careersController.createcareer); //ruta para crear carrera

module.exports=router;