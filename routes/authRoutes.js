const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para la autenticación de usuarios
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
