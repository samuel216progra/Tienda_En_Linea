import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js"; // Importar el middleware de validación de JWT
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "./category.controller.js";

const router = Router();

// Middleware de validación de JWT para todas las rutas
router.use(validarJWT);


router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        validarCampos
    ],
    createCategory
);

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.put(
    "/:id",
    [
        check("id", "Invalid ID").isMongoId(),
        check("name", "Name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        validarCampos
    ],
    updateCategory
);

router.delete("/:id", deleteCategory);

export default router;
