
import Category from './category.model.js';

export const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating category" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching categories" });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        res.json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching category" });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ msg: "Category not found" });
        }
        res.json({ category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating category" });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ msg: "Category not found" });
        }
        res.json({ msg: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error deleting category" });
    }
};
