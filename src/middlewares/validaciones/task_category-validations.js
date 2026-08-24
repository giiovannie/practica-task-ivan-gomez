import { body, param } from "express-validator";

export const validatorTaskCategory = [
    body("task_id")
        .notEmpty().withMessage("el id de la tarea esta vacio")
        .isInt({ min: 1 }).withMessage("el id de la tarea debe ser un entero positivo"),
    body("category_id")
        .notEmpty().withMessage("el id de la categoria esta vacio")
        .isInt({ min: 1 }).withMessage("el id de la categoria debe ser un entero positivo")
];