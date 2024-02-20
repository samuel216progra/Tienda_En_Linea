const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    register: async (req, res) => {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ username: req.body.username });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Crear nuevo usuario
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                role: 'STUDENT_ROLE' // Por defecto, se registra como estudiante
            });
            await newUser.save();

            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    login: async (req, res) => {
        try {
            // Verificar si el usuario existe
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Verificar la contraseña
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Generar token de autenticación
            const token = jwt.sign({ userId: user._id, role: user.role }, 'jwtsecret');

            res.status(200).json({ token });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = authController;
