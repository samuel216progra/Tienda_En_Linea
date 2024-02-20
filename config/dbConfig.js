// Importar Mongoose
const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
const DB_URL = 'mongodb://localhost:27017/control-alumnos';

// Configuración de conexión a la base de datos
const dbConfig = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Conexión exitosa a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar a la base de datos MongoDB:', error);
    }
};

module.exports = dbConfig;
