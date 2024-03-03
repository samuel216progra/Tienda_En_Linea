import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProduct
} from "./product.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").isNumeric(),
        check("cost", "Cost is required").isNumeric(),
        check("category", "Category is required").not().isEmpty(),
        check("stock", "Stock is required").isNumeric(), // Validación del campo stock
        validarCampos
    ],
    createProduct
);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put(
    "/:id",
    [
        check("id", "Invalid ID").isMongoId(),
        check("name", "Name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").isNumeric(),
        check("cost", "Cost is required").isNumeric(),
        check("category", "Category is required").not().isEmpty(),
        check("stock", "Stock is required").isNumeric(), // Validación del campo stock
        validarCampos
    ],
    updateProductById
);

router.delete("/:id", deleteProduct);

export default router;
