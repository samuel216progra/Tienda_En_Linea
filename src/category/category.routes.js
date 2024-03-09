import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "./category.controller.js";

const router = Router();

// Middleware de validación de JWT para todas las rutas excepto para obtener todas las categorías
router.use((req, res, next) => {
    if (req.path === "/" && req.method === "GET") {
        // Si la ruta es "/" y el método es "GET", continuar sin validar el token
        return next();
    }
    validarJWT(req, res, next);
});

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
