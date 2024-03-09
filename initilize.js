import Category from './src/category/category.model.js';

export const createDefaultCategory = async () => {
    try {
        // Verificar si ya existe una categoría por defecto en la base de datos
        const existingCategory = await Category.findOne({ name: 'Default' });

        // Si no existe, crearla con un ID específico
        if (!existingCategory) {
            const defaultCategory = new Category({
                _id: '12345678910', // Especifica el ID deseado aquí
                name: 'several',
                description: 'Default category for products'
            });

            // Guardar la categoría en la base de datos
            await defaultCategory.save();
            console.log('Default category created successfully');
        } else {
            console.log('Default category already exists');
        }
    } catch (error) {
        console.error('Error creating default category:', error);
    }
};
