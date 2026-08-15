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
        res.status(500).json(MESSAGES[500]);
    }
}

export const tarerCategoria = async (req, res) => {
    try {
        const { id } = req.params;
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
        res.status(500).json(MESSAGES[500]);
    }
}

export const crearCategoria = async (req, res) => {
    try {
        const { name, description, color, priority } = req.body;

        if (!name || !description || !color || !priority) {
            return res.status(400).json(MESSAGES[400]);
        }

        if (typeof name !== "string" || typeof description !== "string" || typeof color !== "string" || typeof priority !== "number") {
            return res.status(400).json(MESSAGES[400]);
        }

        if (!Number.isInteger(priority)) {
            return res.status(400).json(MESSAGES[400]);
        }

        if (name.length > 100 || description.length > 255 || color.length !== 7) {
            return res.status(400).json(MESSAGES[400]);
        }

        const existeCategoria = await CategoryModel.findOne({ where: { name } });
        if (existeCategoria) {
            return res.status(400).json(MESSAGES[400]);
        }

        const nuevaCategoria = await CategoryModel.create({ name, description, color, priority });

        return res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json(MESSAGES[500]);
    }
}