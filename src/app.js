// src/app.js
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Middlewares
const { errorHandler } = require('./middlewares/errorHandler');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { sanitizeMiddleware } = require('./middlewares/sanitizeMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careersRoutes');
const userRoutes = require('./routes/userRoutes');
// (studies and matches routes will be added later)

const app = express();

// Global middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimiter);
app.use(sanitizeMiddleware);

// Routes registration
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/users', userRoutes);

// Error handling (must be after routes)
app.use(errorHandler);

module.exports = app;
