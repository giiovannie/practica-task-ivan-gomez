import { body, param } from "express-validator";

export const validationsTask = [
    body("title")
        .notEmpty().withMessage("el titulo esta vacio")
        .isString().withMessage("el titulo debe ser un string")
        .isLength({ max: 100 }).withMessage("el titulo no puede superar los 100 caracteres"),
    body("description")
        .notEmpty().withMessage("la descripcion esta vacia")
        .isString().withMessage("la descripcion debe ser un string")
        .isLength({ max: 100 }).withMessage("la descripcion no puede superar los 100 caracteres"),
    body("isComplete")
        .optional()
        .isBoolean().withMessage("isComplete debe ser booleano"),
    body("user_id")
        .notEmpty().withMessage("el user_id esta vacio")
        .isInt({ min: 1 }).withMessage("el user_id debe ser un entero valido")
];

export const ValidationUpdateTask = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt().withMessage("el id no es del tipo numerico"),
    body("title")
        .optional()
        .isString().withMessage("el titulo debe ser un string")
        .isLength({ max: 100 }).withMessage("el titulo no puede superar los 100 caracteres"),
    body("description")
        .optional()
        .isString().withMessage("la descripcion debe ser un string")
        .isLength({ max: 100 }).withMessage("la descripcion no puede superar los 100 caracteres"),
    body("isComplete")
        .optional()
        .isBoolean().withMessage("el campo no es del tipo booleano"),
    body("user_id")
        .optional()
        .isInt().withMessage("el id del user debe ser entero")
];

export const validationTaskById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt().withMessage("el id no es del tipo entero")
]