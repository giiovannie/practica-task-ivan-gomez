import { TaskModel } from "../models/Task.js";
import { CategoryModel } from "../models/Category.js";
import { TaskCategoryModel } from "../models/Task_Category.js";
import { MESSAGES } from "./User.Controller.js";
import { matchedData } from "express-validator";

export const mostrarRelaciones = async (req, res) => {
    try {
        const relaciones = await TaskCategoryModel.findAll({
            include: [
                {
                    model: TaskModel
                },
                {
                    model: CategoryModel
                }
            ]
        });
        return res.status(200).json(relaciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};

export const asignarCategoriaATarea = async (req, res) => {
    try {
        const { task_id, category_id } = matchedData(req);

        const tarea = await TaskModel.findByPk(task_id);
        const categoria = await CategoryModel.findByPk(category_id);
        
        await tarea.addCategoria(categoria);
        return res.status(200).json({message: "categoria asignada a la tarea correctamente"});
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};

export const quitarCategoriaDeTarea = async (req, res) => {
    try {
        const { task_id, category_id } = matchedData(req);
        const tarea = await TaskModel.findByPk(task_id);
        const categoria = await CategoryModel.findByPk(category_id);
        await tarea.removeCategoria(categoria);
        return res.status(200).json({ message: "categoria eliminada de la tarea correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};

export const updateCategoriadeTarea = async (req,res)=>{
    try {
        const {task_id, category_id} = matchedData(req);
        const tarea = await TaskModel.findByPk(task_id);
        const category = await CategoryModel.findByPk(category_id);

        await tarea.update(category)
        return res.status(200).json({ message: "se actualizo y asigno una categoria de la tarea correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
}