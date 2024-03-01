// dbConfig.js
// dbConfig.js
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/control-alumnos';

const dbConfig = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar a la base de datos MongoDB:', error);
    }
};

module.exports = dbConfig;
