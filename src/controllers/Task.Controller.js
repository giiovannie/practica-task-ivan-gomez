import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";
import { MESSAGES } from "../controllers/User.Controller.js"
import { CategoryModel } from "../models/Category.js";
import { matchedData } from "express-validator";

export const agreguaTarea = async(req,res)=>{
    try {
        const data = matchedData(req)

        const tareaNueva = await TaskModel.create(data)
        return res.status(201).json(tareaNueva)

    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}


export const mostrarTareas = async (req,res) => {
    try {
        const tareas = await TaskModel.findAll({
            include:[
                {
                    model: UserModel,
                    as: "Destinatario",
                    attributes: {
                        exclude: ["password", "user_id"]
                    }
                },
                {
                    model: CategoryModel,
                    as: "categoria"
                }
        ]
        });
        return res.status(200).json(tareas)
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}

export const mostrarTarea = async (req,res) => {
    try {
        const { id } = matchedData(req);
        const tareaEncontrada = await TaskModel.findOne({
            where: { id },
            include:[
                {
                    model: UserModel,
                    as: "Destinatario", // nota para mi: este debe ser igual a la relacion que hice en el index
                    attributes: {
                            exclude: ["password", "user_id"]
                        }
                },
                {
                    model: CategoryModel,
                    as: "categoria"
                }
            ]
        }
        )

        return res.status(200).json(tareaEncontrada)
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}

export const actualizarTarea = async (req, res) => {
    try {
        const { id, ...datos }  = matchedData(req);
        const tareaEncontrada = await TaskModel.findByPk(id);

        await tareaEncontrada.update(datos);
        return res.status(200).json(tareaEncontrada);
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};

export const eliminarTarea = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const tareaEncontrada = await TaskModel.findByPk(id);

        await tareaEncontrada.destroy();
        return res.status(200).json({ message: "Tarea eliminada exitosamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};