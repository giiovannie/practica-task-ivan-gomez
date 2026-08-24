import { body, param } from "express-validator";
import { TaskModel } from "../../models/Task.js";
import { CategoryModel } from "../../models/Category.js";
import { TaskCategoryModel } from "../../models/Task_Category.js";

export const validatorTaskCategory = [
    body("task_id")
        .notEmpty().withMessage("el id de la tarea esta vacio")
        .isInt({ min: 1 }).withMessage("el id de la tarea debe ser un entero positivo")
        .bail()
        .custom(async (task_id) => {
            const task = await TaskModel.findByPk(task_id)
            if (!task) throw new Error("la tarea no existe")
            return true
        }),
    body("category_id")
        .notEmpty().withMessage("el id de la categoria esta vacio")
        .isInt({ min: 1 }).withMessage("el id de la categoria debe ser un entero positivo")
        .bail()
        .custom(async (category_id) => {
            const category = await CategoryModel.findByPk(category_id)
            if (!category) throw new Error("la categoria no existe")
            return true
        })
];