import { Router } from "express";
import { check } from "express-validator";
import {
    createUser,
    getUsers,
    updateUser
} from "./user.controller.js";
import {
    existeUserById,
    existenteEmail
} from "../helpers/db-validators.js"
import { validarCampos } from "../middlewares/validar-campos.js"
//import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.get("/", getUsers);

router.post(
    "/",
    [
        check("name", "The name is necessary").not().isEmpty(),
        check("userName", "The UserName is necessary").not().isEmpty(),
        check("lastName", "The LastName is necessary").not().isEmpty(),
        check("email").custom(existenteEmail),
        check("password", "The password must be at least 6 characters").isLength({
            min: 6
        }),
        check("role").optional().isIn(['ROLE_CLIENT', 'ROLE_ADMIN']), // Validate role if provided
        validarCampos
    ],
    createUser
);

router.put(
    "/:id",
    [
        check("id", "No es un Id válido").isMongoId(),
        check("id").custom(existeUserById),
        check("role").optional().isIn(['ROLE_CLIENT', 'ROLE_ADMIN']), // Validate role if provided
        validarCampos,
    ],
    updateUser
);

export default router;
