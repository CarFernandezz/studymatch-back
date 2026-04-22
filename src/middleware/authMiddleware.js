const jwt = require('jsonwebtoken');

//Middleware para verificar el JWT
exports.verifyToken = (req, res, next) => {
    try {
        //Obtener el token del header Authorization
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        //Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_2024');

        //Guardar la información del usuario en req para usar después
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next(); // continuar al siguiente middleware o ruta
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
