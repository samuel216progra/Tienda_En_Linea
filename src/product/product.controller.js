import Product from './product.model.js';

export const createProduct = async (req, res) => {
    const { name, description, price, cost, category, stock } = req.body;

    try {
        let categoryId = category; // El ID de la categoría proporcionado en la solicitud
        // Si no se proporciona un ID de categoría, asigna el ID de la categoría predeterminada "several"
        if (!categoryId) {
            
            categoryId = '12345678910';
        }
        
        const product = new Product({ name, description, price, cost, category: categoryId, stock });
        await product.save();
        res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating product" });
    }
};


export const getProducts = async (req, res) => {
    // Implementación de la función para obtener todos los productos
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting products" });
    }
};

export const getProductById = async (req, res) => {
    // Implementación de la función para obtener un producto por su ID
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
    // Implementación de la función para actualizar un producto por su ID
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
    // Implementación de la función para eliminar un producto
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

export default {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProduct
};
