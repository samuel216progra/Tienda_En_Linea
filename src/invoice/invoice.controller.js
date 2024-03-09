import Invoice from './invoice.model.js';
import Cart from '../trolley/cart.model.js';

export const createInvoice = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const totalPrice = calculateTotalPrice(cart.items);
        
        const invoice = new Invoice({
            user: userId,
            items: cart.items,
            totalPrice
        });

        await invoice.save();

       
        cart.items = [];
        await cart.save();

        res.status(201).json({ msg: 'Invoice created successfully', invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating invoice' });
    }
};

export const getUserInvoices = async (req, res) => {
    const userId = req.user._id;

    try {
        const invoices = await Invoice.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ invoices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error getting user invoices' });
    }
};

// Helper function to calculate total price
const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};
