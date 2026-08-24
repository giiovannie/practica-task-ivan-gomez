import { body, param } from "express-validator";

import { body, param } from "express-validator";

export const validatorInsertDireccion = [
    body("calle")
        .notEmpty().withMessage("el campo de calle esta vacio")
        .isString().withMessage("el campo de calle no es del tipo string")
        .isLength({ min: 3, max: 100 }).withMessage("el campo de calle no cumple con los caracteres minimos o maximos"),
    body("ciudad")
        .notEmpty().withMessage("el campo de ciudad esta vacio")
        .isString().withMessage("el campo de ciudad no es del tipo string")
        .isLength({ min: 3, max: 100 }).withMessage("el campo de ciudad no cumple con la cantidad minima o maxima de caracteres"),
    body("provincia")
        .notEmpty().withMessage("el campo de provincia esta vacio")
        .isString().withMessage("el campo de provincia no es del tipo string")
        .isLength({ min: 3, max: 100 }).withMessage("el campo de provincia no cumple con la cantidad minima o maxima de caracteres"),
    body("pais")
        .notEmpty().withMessage("el campo de pais esta vacio")
        .isString().withMessage("el campo de pais no es del tipo string")
        .isLength({ min: 2, max: 100 }).withMessage("el campo de pais no cumple con la cantidad minima o maxima de caracteres"),
    body("cod_postal")
        .notEmpty().withMessage("el campo del codigo postal esta vacio")
        .isInt().withMessage("el codigo postal no es del tipo entero"),
    body("user_id")
        .notEmpty().withMessage("el campo del id del usuario no debe estar vacio")
        .isInt({ min: 1 }).withMessage("el id del user debe ser un entero positivo")
];

export const validatorUpdateDireccion = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({ min: 1 }).withMessage("el id debe ser un entero positivo"),
    body("calle")
        .optional()
        .isString().withMessage("el campo de calle no es del tipo string")
        .isLength({ min: 3, max: 100 }).withMessage("el campo de calle no cumple con los caracteres minimos o maximos"),
    body("ciudad")
        .optional()
        .isString().withMessage("el campo de ciudad no es del tipo string")
        .isLength({ min: 3, max: 100 }).withMessage("el campo de ciudad no cumple con la cantidad minima o maxima de caracteres"),
    body("provincia")
        .optional()
        .isString().withMessage("el campo de provincia no es del tipo string")
        .isLength({ min: 3, max: 100 }).withMessage("el campo de provincia no cumple con la cantidad minima o maxima de caracteres"),
    body("pais")
        .optional()
        .isString().withMessage("el campo de pais no es del tipo string")
        .isLength({ min: 2, max: 100 }).withMessage("el campo de pais no cumple con la cantidad minima o maxima de caracteres"),
    body("cod_postal")
        .optional()
        .isInt().withMessage("el codigo postal no es del tipo entero"),
    body("user_id")
        .optional()
        .isInt({ min: 1 }).withMessage("el id del user debe ser un entero positivo")

];

export const validatorDireccionById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({ min: 1 }).withMessage("el id debe ser un entero positivo")

];