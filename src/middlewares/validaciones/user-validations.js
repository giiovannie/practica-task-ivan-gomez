//vine pimero aca :)
import { body } from "express-validator";

export const validationsUser = [
    body("email")
        .notEmpty().whitMessage('El campo del email esta vacio')
        .isEmail().withMesagge('el email debe de ser valido :/'),
    body("name")
        .notEmptyEmpty().withMessage("el nombre esta vacio")
        .isLength({ min: 3}).withMessage("el nombre no cumple con lo requerido"),
    body("password")
        .notEmpty().withMessage("la contraseña esta vacia(no debe estarlo)")
        .isLength({min: 8}).withMessage("la contraseña o tiene un minimo de 8 caracteres")
]