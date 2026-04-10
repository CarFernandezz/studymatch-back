const express= require('express'); //importa

const router=express.Router(); //crea un router 

const authController=require('../controllers/authControllers'); //importa el controlador de autenticacion
const { verifyToken } = require('../middleware/authMiddleware'); //importa el middleware de autenticacion

//rutas de autenticacion
router.post('/register',authController.register); // registrar nuevo usuario
router.post('/login',authController.login); // iniciar sesion

//Ruta protegida de ejemplo (requiere token)
router.get('/me', verifyToken, (req, res) => {
    res.json({ 
        message: 'Usuario autenticado',
        userId: req.userId,
        email: req.userEmail 
    });
});

module.exports=router; 