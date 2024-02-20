const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas para la gestión de usuarios
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.delete('/profile', authMiddleware, userController.deleteUserProfile);

module.exports = router;
