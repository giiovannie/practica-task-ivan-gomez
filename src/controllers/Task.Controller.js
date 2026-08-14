import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";
import { MESSAGES } from "../controllers/User.Controller.js"

export const agreguaTarea = async(req,res)=>{
    try {
        const {title, description , isComplete, user_id} = req.body;

        if (!title || !description || !user_id) {
            return res.status(400).json(MESSAGES[400]);
        }

        if (title.length > 100 || description.length > 100) {
            return res.status(400).json(MESSAGES[400]);
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json(MESSAGES[400]);
        }

        const usuarioExiste = await UserModel.findOne({ where: { id: user_id } });
        if (!usuarioExiste) {
            return res.status(404).json({ message: "El usuario no existe." });
        }

        const coincidencias = await TaskModel.findOne({ where: { title } })
        if (coincidencias) {
            return res.status(400).json({ message: "El título de la tarea ya existe." });
        }

        const tareaNueva = await TaskModel.create(
            {
                title,
                description,
                isComplete,
                user_id
            }
        )

        return res.status(201).json(tareaNueva)

    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}


export const mostrarTareas = async (req,res) => {
    try {
        const tareas = await TaskModel.findAll({
            include:[{
                model: UserModel,
                as: "Destinatario",
                attributes: {
                    exclude: ["password", "user_id"]
                }
            }]
        });
        return res.status(200).json(tareas)
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}

export const mostrarTarea = async (req,res) => {
    try {
        const { id } = req.params;
        const tareaEncontrada = await TaskModel.findOne({
            where: { id },
            include:{
                model: UserModel,
                as: "Destinatario", // nota para mi: este debe ser igual a la relacion que hice en el index
                attributes: {
                    exclude: ["password", "user_id"]
                }
            }
        }
        )

        if(!tareaEncontrada) return res.status(404).json(MESSAGES[404])

        return res.status(200).json(tareaEncontrada)
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}

export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEncontrada = await TaskModel.findOne({ where: { id } });

        if (!tareaEncontrada) return res.status(404).json(MESSAGES[404]);

        const { title, description, isComplete } = req.body;

        if (!title || !description) return res.status(400).json(MESSAGES[400]);
        if (title.length > 100 || description.length > 100) return res.status(400).json(MESSAGES[400]);
        if (typeof isComplete !== "boolean") return res.status(400).json(MESSAGES[400]);

        await TaskModel.update({ title, description, isComplete }, { where: { id } });

        const tareaActualizada = await TaskModel.findOne({ where: { id } });
        return res.status(200).json(tareaActualizada);

    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};

export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEncontrada = await TaskModel.findOne({ where: { id } });

        if (!tareaEncontrada) return res.status(404).json(MESSAGES[404]);

        await tareaEncontrada.destroy();
        return res.status(200).json({ message: "Tarea eliminada exitosamente." });

    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};