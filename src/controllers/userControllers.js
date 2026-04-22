const User = require('../models/user'); // Importa el modelo User desde la carpeta models

exports.updateProfile = async (req, res) => { // Exporta la función updateProfile como controlador async
    try { // Inicia bloque try para manejar errores

        const { carrera, anio, materias } = req.body; // Extrae carrera, anio y materias enviados en el body

        if (!carrera && !anio && !materias) { // Verifica si no vino ningún campo para actualizar
            return res.status(400).json({
                message: 'Al menos un campo debe ser proporcionado para actualizar el perfil'
            }); // Responde error 400 si no se envió nada
        }

        if (anio && (typeof anio !== 'number' || anio < 1 || anio > 6)) { 
            // Si anio existe, valida que sea número entre 1 y 6

            return res.status(400).json({ message: 'Año inválido' }); // Devuelve error si el año no cumple la validación
        }

        // Validación de materias

        const estadosValidos = [
            'aprobada',
            'cursando',
            'pendiente',
            'recursando',
            'no cursada'
        ]; // Lista de estados permitidos para materias

        const nivelesValidos = [
            'basico',
            'intermedio',
            'avanzado'
        ]; // Lista de niveles permitidos

        if (materias) { // Si se enviaron materias
            for (const materia of materias) { // Recorre cada materia del array

                if (materia.estado && !estadosValidos.includes(materia.estado)) { 
                    // Si trae estado y no está en la lista válida

                    return res.status(400).json({
                        message: `Estado de materia inválido: ${materia.estado}`
                    }); // Error por estado inválido
                }

                if(materia.esAyudante && materia.estado !== 'aprobada') {
                    return res.status(400).json({ message: `Una materia solo puede ser marcada como ayudante si su estado es aprobada` 
                    });// Error por estado no aprobado para ayudante
                }

                if(materia.esAyudante && !materia.nivel){
                    return res.status(400).json({message: 'debes indicar tu nivel para ser ayudante'}); // Error por falta de nivel para ayudante
                };

                if (materia.nivel && !nivelesValidos.includes(materia.nivel)) { 
                    // Si trae nivel y no está permitido

                    return res.status(400).json({
                        message: `Nivel de materia inválido: ${materia.nivel}`
                    }); // Error por nivel inválido
                }
            }
        }

        const updatedUser = await User.findByIdAndUpdate( req.userId, // ID del usuario autenticado
         { carrera, anio, materias }, // Campos a actualizar
            { new: true } // Devuelve el documento actualizado
        )
        .populate('carrera') // Reemplaza el id de carrera con el documento relacionado
        .select('-password'); // Excluye la contraseña del resultado

        if (!updatedUser) { // Si no encontró usuario con ese ID
            return res.status(404).json({
                message: 'Usuario no encontrado'
            }); // Responde error 404
        }

        res.json({
            message: 'Perfil actualizado exitosamente',
            user: updatedUser
        }); // Respuesta exitosa con usuario actualizado

    } catch (error) { // Captura errores inesperados
        res.status(500).json({
            message: 'Error al actualizar el perfil',
            error
        }); 
    }
};

exports.getProfile = async (req, res) => { // Exporta función para obtener perfil del usuario
    try{
        const user = await User.findById(req.userId)// Busca el usuario por ID obtenido del token
            .populate('carrera') // Reemplaza el id de carrera con el documento relacionado
            .select('-password'); // Excluye la contraseña del resultado

        if (!user) { // Si no encontró usuario con ese ID
            return res.status(404).json({
                message: 'Usuario no encontrado'
            }); // Responde error 404
        }

        res.json({
            message: 'Perfil obtenido exitosamente',
            user
        }); // Respuesta exitosa con usuario
    }
    catch(error){ // Captura errores inesperados
        res.status(500).json({
            message: 'Error al obtener el perfil',
            error
        }); 
    }

}


