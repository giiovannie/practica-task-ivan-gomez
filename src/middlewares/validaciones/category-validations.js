import { body, param } from "express-validator";

export const validatorCategoryInsert = [
    body("name")
        .notEmpty().withMessage("el nombre esta vacio")
        .isString().withMessage("el nombre debe ser un string")
        .isLength({ max: 100 }).withMessage("el nombre no puede superar los 100 caracteres"),
    body("description")
        .notEmpty().withMessage("la descripcion no puede estar vacia")
        .isString().withMessage("la descripcion no es del tipo string")
        .isLength({ max: 255 }).withMessage("la descripcion no puede superar los 255 caracteres"),
    body("color")
        .notEmpty().withMessage("el campo de color esta vacio")
        .isString().withMessage("el campo no es del tipo string")
        .isLength({max: 8}).withMessage("este campo supera los 7 caracteres permitidos"),
    body("priority")
        .notEmpty().withMessage("el campo de prioridad no debe estar vacio")
        .isInt({ min: 0 }).withMessage("la prioridad debe ser un entero mayor o igual a 0")
]

export const validationUpdateCategory = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({ min: 1 }).withMessage("el id debe ser entero positivo"),
    body("name")
        .optional()
        .isString().withMessage("el campo de nombre debe ser del tipo string")
        .isLength({ max: 100 }).withMessage("el campo de nombre es mayor a los 100 caracteres permitidos"),
    body("description")
        .optional()
        .isString().withMessage("el campo de descripcion debe ser del tipo string")
        .isLength({ max: 255 }).withMessage("la descripcion no puede superar los 255 caracteres"),
    body("color")
        .optional()
        .isString().withMessage("el campo de color debe ser del tipo string"),
    body("priority")
        .optional()
        .isInt({ min: 0 }).withMessage("la prioridad debe ser un entero mayor o igual a 0")
];

export const validationGetCategoryById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({min: 1}).withMessage("el id debe ser del tipo entero y/o positivo")
]