// En product.routes.js

import { Router } from "express";
import { check } from "express-validator";
import { getProductsOutOfStock } from "./product.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProduct,

} from "./product.controller.js";

const router = Router();
router.get("/out-of-stock", getProductsOutOfStock);

router.use(validarJWT);

router.post(
    "/",
    [
        
        check("name", "Name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price is required").isNumeric(),
        check("cost", "Cost is required").isNumeric(),
        check("category", "Category is required").not().isEmpty(),
        check("stock", "Stock is required").isNumeric(),
        check("sale", "Sale must be one of 'ALTA', 'MEDIA', 'BAJA'").isIn(['ALTA', 'MEDIA', 'BAJA']),
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
        check("stock", "Stock is required").isNumeric(),
        validarCampos
    ],
    updateProductById
);

router.delete("/:id", deleteProduct);


router.get("/out-of-stock", getProductsOutOfStock);

export default router;
