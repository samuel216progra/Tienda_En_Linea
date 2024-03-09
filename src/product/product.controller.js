import { validarJWT } from '../middlewares/validar-jwt.js';
import Product from './product.model.js';
import Category from '../category/category.model.js';



export const createProduct = async (req, res) => {
    if (req.user.role !== 'ROLE_ADMIN') {
        return res.status(403).json({ msg: 'Access forbidden. Only admin users allowed.' });
    }

    const { name, description, price, cost, category, stock, sale } = req.body;

    try {
        let categoryId = category; 
        if (!categoryId) {
            categoryId = '12345678910';
        }

        // Buscar la categoría por su nombre
        const categoryObj = await Category.findOne({ name: category });

        if (!categoryObj) {
            return res.status(400).json({ msg: 'Category not found' });
        }
        
        const product = new Product({ name, description, price, cost, category: categoryObj.name, stock, sale });
        await product.save();
        res.status(201).json({ product: product.toObject() }); // Agregar el método toObject() para incluir todos los campos del documento en la respuesta
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating product" });
    }
};



export const getProducts = async (req, res) => {

    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting products" });
    }
};

export const getProductById = async (req, res) => {
   
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting product" });
    }
};

export const updateProductById = async (req, res) => {
   
    const { id } = req.params;
    const { name, description, price, cost, category, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, cost, category, stock }, { new: true });
        res.status(200).json({ product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating product" });
    }
};

export const deleteProduct = async (req, res) => {
   
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error deleting product" });
    }
};



export const getProductsOutOfStock = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0 });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting products out of stock" });
    }
};


export const getProductsBySale = async (req, res) => {
    try {
        const products = await Product.find({ sale: 'ALTA' });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting products by sale" });
    }
};
export const getProductByName = async (req, res) => {
    const { name } = req.params;

    try {
        const product = await Product.findOne({ name });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting product" });
    }
};


export const getProductByCategory = async (req, res) => {
    const { categoryName } = req.query;

    try {
        const products = await Product.find({ category: categoryName });
        if (!products || products.length === 0) {
            return res.status(404).json({ msg: "Products not found for the given category" });
        }
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting products by category" });
    }
};

export const addStockToProduct = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Sumar la cantidad especificada al stock actual del producto
        product.stock += parseInt(quantity);
        await product.save();

        res.status(200).json({ msg: `Added ${quantity} units to product stock`, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error adding stock to product" });
    }
};