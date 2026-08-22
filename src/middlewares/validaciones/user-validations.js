//vine pimero aca :)
import { body, param } from "express-validator";

export const validationsUser = [
    body("email")
        .notEmpty().withMessage('El campo del email esta vacio')
        .isEmail().withMessage('el email debe de ser valido :/'),
    body("name")
        .notEmpty().withMessage("el nombre esta vacio")
        .isLength({ min: 3}).withMessage("el nombre no cumple con lo requerido"),
    body("password")
        .notEmpty().withMessage("la contraseña esta vacia(no debe estarlo)")
        .isLength({min: 8}).withMessage("la contraseña o tiene un minimo de 8 caracteres")
]

export const validatorUpdatedUser = [
    param("id")
        .isInt().withMessage("el id no es del tipo numerico")
        .notEmpty().withMessage("el id esta vacio"),
    body("name")
        .optional()
        .isString().withMessage("el nombre no es un string")
        .isLength({min: 3}).withMessage("el nombre no cumple con lo minimo de caracter")
        .notEmpty().withMessage("el nombre esta vacio"),
    body("email")
        .optional()
        .isEmail().withMessage("el email es invalido")
        .notEmpty().withMessage("el email esta vacio"),
    body("password")
        .optional()
        .notEmpty().withMessage("la contraseña esta vacia")
        .isLength({min: 8}).withMessage("la contraseña no tiene el minimo de 8 caracteres")
]

//este validador lo va a ocupar el getbyid y el delete porque ambos por ahora nesecitan validar el id que viene de param
export const validatorUserById = [
        param("id")
            .notEmpty().withMessage("el id esta vacio")
            .isInt().withMessage("el id no es del tipo entero")
]
