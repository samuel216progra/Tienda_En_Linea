'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/client/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import productRoutes from '../src/product/product.routes.js'; 
import categoryRoutes from '../src/category/category.routes.js'; 

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuarioPath = '/tiendaOnline/v1/users';
        this.authPath = '/tiendaOnline/v1/auth';
        this.productPath = '/tiendaOnline/v1/products'; 
        this.categoryPath = '/tiendaOnline/v1/categories'; 

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        // Implementar las rutas de los usuarios y autenticación
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);

        // Implementar las rutas de productos y categorías
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
