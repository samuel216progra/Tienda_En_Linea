import { Router } from 'express';
import { addToCart, 
    getAllProductsInCart, 
    updateCartItemQuantity, 
    getCartByUser, 
    removeProductFromCart } from './cart.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();


router.post('/add-to-cart', addToCart);


router.get('/all', getAllProductsInCart);

router.put('/update-quantity', updateCartItemQuantity);


router.get('/get-cart-by-user',  getCartByUser);


router.delete('/remove-from-cart', removeProductFromCart);

export default router;