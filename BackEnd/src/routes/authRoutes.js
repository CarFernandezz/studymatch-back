const express= require('express'); //importa

const router=express.Router(); //crea un router 

const authController=require('../controllers/authControllers'); //importa el controlador de autenticacion

//rutas de autenticacion
router.post('/register',authController.register); // registrar nuevo usuario
router.post('/login',authController.login); // iniciar sesion

module.exports=router; 