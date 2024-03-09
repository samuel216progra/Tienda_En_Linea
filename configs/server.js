import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/client/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import productRoutes from '../src/product/product.routes.js'; 
import categoryRoutes from '../src/category/category.routes.js'; 
import cartRoutes from '../src/trolley/cart.routes.js';
import invoiceRoutes from '../src/invoice/invoice.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuarioPath = '/tiendaOnline/v1/users';
        this.authPath = '/tiendaOnline/v1/auth';
        this.productPath = '/tiendaOnline/v1/products'; 
        this.categoryPath = '/tiendaOnline/v1/categories'; 
        this.cartPath = '/tiendaOnline/v1/cart'; 
        this.invoicePath = '/tiendaOnline/v1/invoices';

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
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.cartPath, cartRoutes);
        this.app.use(this.invoicePath, invoiceRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
