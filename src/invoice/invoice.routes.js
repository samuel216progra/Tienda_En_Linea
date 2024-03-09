import { Router } from 'express';
import { createInvoice, 
        getUserInvoices } from './invoice.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();


router.post('/create-invoice', validarJWT, createInvoice);

router.get('/user-invoices', validarJWT, getUserInvoices);

export default router;
