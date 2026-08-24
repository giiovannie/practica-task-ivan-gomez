import { matchedData } from "express-validator";
import { CategoryModel } from "../models/Category.js";
import { TaskModel } from "../models/Task.js";
import { MESSAGES } from "./User.Controller.js";

export const getAllCtegory = async (req, res) => {
    try {
        const todasCategorias = await CategoryModel.findAll({
            include: {
                model: TaskModel,
                as: "tareas",
            }
        });
        return res.status(200).json(todasCategorias);
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
}

export const tarerCategoria = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const traerCategoriaById = await CategoryModel.findByPk(id, {
            include: {
                model: TaskModel,
                as: "tareas",
            }
        });
        if (!traerCategoriaById) return res.status(404).json(MESSAGES[404]);
        return res.status(200).json(traerCategoriaById);
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
}

export const crearCategoria = async (req, res) => {
    try {
        const data = matchedData(req)
        const existeCategoria = await CategoryModel.findOne({where: { name: data.name }});
        if (existeCategoria) { return res.status(400).json(MESSAGES[400]);}
        const nuevaCategoria = await CategoryModel.create(data);
        return res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
}

export const updateCategory = async (req,res)=>{
    try {
        const { id, ...data } = matchedData(req);
        const categoria = await CategoryModel.findByPk(id);
        if (!categoria) return res.status(404).json(MESSAGES[404]);
        await categoria.update(data);
        return res.status(200).json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
}

export const deleteCategory = async (req,res)=>{
    try {
        const { id } = matchedData(req);
        const category = await CategoryModel.findByPk(id);
        if (!category) return res.status(404).json(MESSAGES[404]);
        await category.destroy();
        return res.status(200).json({
            message: "se borro exitosamente la categoria"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
}