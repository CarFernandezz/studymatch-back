const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');   // Importa el controlador de usuario
const { verifyToken } = require('../middleware/authMiddleware');// Importa el middleware de autenticación

// Rutas de usuario
router.put('/profile', verifyToken, userController.updateProfile); // Actualizar perfil del usuario
router.get('/profile', verifyToken, userController.getProfile); // Obtener perfil del usuario

module.exports = router; 