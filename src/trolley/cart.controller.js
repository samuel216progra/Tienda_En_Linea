import Cart from './cart.model.js';
import Product from '../product/product.model.js';
import User from '../client/user.model.js';


export const addToCart = async (req, res) => {

    const { userId, productId, quantity } = req.body; 

    try {
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }


        if (product.stock < quantity) {
            return res.status(400).json({ msg: 'Insufficient stock' });
        }


        product.stock -= quantity;
        await product.save();

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            
            cart = new Cart({ user: userId, items: [] });
        }

   
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            
            existingItem.quantity += quantity;
        } else {
           
            cart.items.push({ product: productId, quantity });
        }

    
        await cart.save();

       
        const addedProduct = await Product.findById(productId);

   
        res.status(200).json({ msg: 'Product added to cart successfully', addedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error adding product to cart' });
    }
};


export const getAllProductsInCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.status(200).json({ products: cart.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error getting products in cart' });
    }
};


export const updateCartItemQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (!existingItem) {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }

        existingItem.quantity = quantity;
        await cart.save();
        res.status(200).json({ msg: 'Cart item quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating cart item quantity' });
    }
};


export const getCartByUser = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error getting cart by user' });
    }
};


export const removeProductFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const updatedItems = cart.items.filter(item => item.product.toString() !== productId);
        cart.items = updatedItems;
        await cart.save();
        res.status(200).json({ msg: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error removing product from cart' });
    }
};