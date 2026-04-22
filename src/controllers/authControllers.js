const { register, login } = require('../services/authService');
const { AppError } = require('../utils/AppError');

// Registro de usuario
exports.register = async (req, res, next) => {
  try {
    const { user, token } = await register(req.body);
    res.status(201).json({ userId: user._id, token });
  } catch (err) {
    next(err);
  }
};

// Login de usuario
exports.login = async (req, res, next) => {
  try {
    const { user, token } = await login(req.body);
    res.status(200).json({ userId: user._id, token });
  } catch (err) {
    next(err);
  }
};

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return next(new AppError('Usuario no encontrado', 404));
    res.json({ user });
  } catch (err) {
    next(err);
  }
};