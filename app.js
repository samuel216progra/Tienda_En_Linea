import { config } from "dotenv";
import Server from "./configs/server.js";
import Category from "./src/category/category.model.js";
config();

const server = new Server();


(async () => {
    try {
        const defaultCategory = await Category.findOne({ name: "Category Default" });
        if (!defaultCategory) {
            await Category.create({
                name: "Category Default",
                description: "A default product"
            });
            console.log("Default category created successfully");
        }
    } catch (error) {
        console.error("Error creating default category:", error);
    }

    server.listen();
})();
