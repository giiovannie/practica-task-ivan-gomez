import { body, param } from "express-validator";
import { UserModel } from "../../models/User.js";
import { TaskModel } from "../../models/Task.js";

export const validationsTask = [
    body("title")
        .notEmpty().withMessage("el titulo esta vacio")
        .isString().withMessage("el titulo debe ser un string")
        .isLength({ max: 100 }).withMessage("el titulo no puede superar los 100 caracteres")
        .bail()
        .custom(async (title) => {
            const task = await TaskModel.findOne({ where: { title } });
            if (task) throw new Error("ya existe una tarea con ese titulo");
            return true;
        }),
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
        .bail()
        .custom(async (user_id) => {
            const user = await UserModel.findByPk(user_id);
            if (!user) throw new Error("el usuario asignado a la tarea no existe");
            return true;
        })
];

export const ValidationUpdateTask = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt().withMessage("el id no es del tipo numerico")
        .bail()
        .custom(async (id) => {
            const task = await TaskModel.findByPk(id);
            if (!task) throw new Error("la tarea no existe");
            return true;
        }),
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
        .bail()
        .custom(async (id) => {
            const task = await TaskModel.findByPk(id);
            if (!task) throw new Error("la tarea no existe");
            return true;
        })
]