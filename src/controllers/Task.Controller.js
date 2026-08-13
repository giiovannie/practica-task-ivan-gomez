import { TaskModel } from "../models/Task.js";
import { MESSAGES } from "./user.Controller.js"

export const agreguaTarea = async(req,res)=>{
    try {
        const {title, description , isComplete} = req.body;

        if (!title || !description) {
            return res.status(400).json(MESSAGES[400]);
        }

        if (title.length > 100 || description.length > 100) {
            return res.status(400).json(MESSAGES[400]);
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json(MESSAGES[400]);
        }

        const coincidencias = await TableTask.findOne({ where: { title } });

        if (coincidencias) {
            return res.status(400).json({ message: "El título de la tarea ya existe." });
        }

        const tareaNueva = await TableTask.create(
            {
                title,
                description,
                isComplete
            }
        )

        return res.status(201).json(tareaNueva)

    } catch (error) {
        return res.status(500).json(MESSAGES[500])
    }
}


export const mostrarTareas = async (req,res) => {
    try {
        const tareas = await TableTask.findAll();
        return res.status(200).json(tareas)
    } catch (error) {
        return res.status(500).json(MESSAGES[500])
    }
}

export const mostrarTarea = async (req,res) => {
    try {
        const { id } = req.params;
        const tareaEncontrada = await TableTask.findOne(
            {where: { id }}
        )

        if(!tareaEncontrada) return res.status(404).json(MESSAGES[404])

        return res.status(200).json(tareaEncontrada)
    } catch (error) {
        return res.status(500).json(MESSAGES[500])
    }
}

export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEncontrada = await TableTask.findOne({ where: { id } });

        if (!tareaEncontrada) return res.status(404).json(MESSAGES[404]);

        const { title, description, isComplete } = req.body;

        if (!title || !description) return res.status(400).json(MESSAGES[400]);
        if (title.length > 100 || description.length > 100) return res.status(400).json(MESSAGES[400]);
        if (typeof isComplete !== "boolean") return res.status(400).json(MESSAGES[400]);

        await TableTask.update({ title, description, isComplete }, { where: { id } });

        const tareaActualizada = await TableTask.findOne({ where: { id } });
        return res.status(200).json(tareaActualizada);

    } catch (error) {
        return res.status(500).json(MESSAGES[500]);
    }
};

export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEncontrada = await TableTask.findOne({ where: { id } });

        if (!tareaEncontrada) return res.status(404).json(MESSAGES[404]);

        await tareaEncontrada.destroy();
        return res.status(200).json({ message: "Tarea eliminada exitosamente." });

    } catch (error) {
        return res.status(500).json(MESSAGES[500]);
    }
};