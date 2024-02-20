const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas para la gestión de cursos
router.post('/courses', authMiddleware, courseController.createCourse);
router.get('/courses', authMiddleware, courseController.getCourses);
router.put('/courses/:id', authMiddleware, courseController.updateCourse);
router.delete('/courses/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;
