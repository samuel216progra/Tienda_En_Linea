// middleware/authMiddleware.js

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    // Aquí puedes implementar la lógica de autenticación, por ejemplo, verificar si el usuario está autenticado
    const isAuthenticated = true; // Por ejemplo, asumimos que el usuario está autenticado

    // Si el usuario está autenticado, llamamos a next() para pasar al siguiente middleware o a la ruta final
    if (isAuthenticated) {
        next();
    } else {
        // Si el usuario no está autenticado, enviamos un mensaje de error
        res.status(401).json({ message: 'No autorizado' });
    }
};

module.exports = authMiddleware;
