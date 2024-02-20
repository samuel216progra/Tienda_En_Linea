const Course = require('../models/Course');
const User = require('../models/User');

const courseController = {
    createCourse: async (req, res) => {
        try {
            // Crear un nuevo curso asociado al profesor
            const newCourse = new Course({
                title: req.body.title,
                description: req.body.description,
                teacher: req.userId // ID del profesor obtenido del token de autenticación
            });
            await newCourse.save();

            res.status(201).json({ message: 'Curso creado correctamente' });
        } catch (error) {
            console.error('Error al crear curso:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getCourses: async (req, res) => {
        try {
            // Obtener todos los cursos asociados al profesor
            const courses = await Course.find({ teacher: req.userId });
            res.status(200).json(courses);
        } catch (error) {
            console.error('Error al obtener cursos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    updateCourse: async (req, res) => {
        try {
            // Actualizar el curso
            await Course.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: 'Curso actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar curso:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    deleteCourse: async (req, res) => {
        try {
            // Eliminar el curso
            await Course.findByIdAndDelete(req.params.id);
            // Desasignar el curso de todos los estudiantes
            await User.updateMany({ courses: req.params.id }, { $pull: { courses: req.params.id } });
            res.status(200).json({ message: 'Curso eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar curso:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = courseController;
