const User = require('../models/User');

const userController = {
    getUserProfile: async (req, res) => {
        try {
            // Buscar el perfil del usuario por su ID
            const userProfile = await User.findById(req.userId).select('-password');
            res.status(200).json(userProfile);
        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    updateUserProfile: async (req, res) => {
        try {
            // Actualizar el perfil del usuario
            await User.findByIdAndUpdate(req.userId, req.body);
            res.status(200).json({ message: 'Perfil de usuario actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar perfil de usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    deleteUserProfile: async (req, res) => {
        try {
            // Eliminar el perfil del usuario
            await User.findByIdAndDelete(req.userId);
            res.status(200).json({ message: 'Perfil de usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar perfil de usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = userController;
