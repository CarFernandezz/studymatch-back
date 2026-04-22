//Validar formato de email
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//Validar contraseña (mínimo 6 caracteres)
exports.isValidPassword = (password) => {
    return password && password.length >= 6;
};

//Validar datos de registro
exports.validateRegister = (data) => {
    const { email, password, nombre, carrera, anio } = data;
    const errors = [];

    if (!email || !this.isValidEmail(email)) {
        errors.push('Email inválido');
    }

    if (!password || !this.isValidPassword(password)) {
        errors.push('Contraseña debe tener mínimo 6 caracteres');
    }

    if (!nombre || nombre.trim() === '') {
        errors.push('Nombre es requerido');
    }

    if (!carrera) {
        errors.push('Carrera es requerida');
    }

    if (!anio || anio < 1 || anio > 6) {
        errors.push('Año debe estar entre 1 y 6');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
