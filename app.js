// Importar Express
const express = require('express');
// Importar Mongoose
const mongoose = require('mongoose');
// Importar configuración de la base de datos
const dbConfig = require('./config/dbConfig');

// Crear una instancia de Express
const app = express();

// Configuración de Express para usar JSON como middleware
app.use(express.json());

// Configurar conexión a la base de datos MongoDB
dbConfig();

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor Express
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
