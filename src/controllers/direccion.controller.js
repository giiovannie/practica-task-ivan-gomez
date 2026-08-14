import { DireccionModel } from "../models/Direccion.js";
import { MESSAGES } from "./User.Controller.js";
import { UserModel } from "../models/User.js";

export const getAllWays = async (req,res)=>{
    try {
        const direcciones  = await DireccionModel.findAll({
            attributes: {
                exclude: ["user_id", "createdAt", "updateAt"]
            },
            include: {
                model: UserModel, as: "author"
            }
        })

        return res.status(200).json(direcciones);
    } catch (error) {
        console.error(error);
        res.status(500).json(MESSAGES[500])
    }
}

export const getAlWaysId = async (req,res)=>{
    try {
        const { id } = req.params;

        const tarerDireccion = await DireccionModel.findOne(
            {
                where: {id},
                include: {
                    model: UserModel, as: "author"
                },
                attributes: {
                    exclude: ["user_id", "createdAt", "updateAt"]
                }
            }
        )

        return res.status(200).json(tarerDireccion);
    } catch (error) {
        console.error(error);
        res.status(500).json(MESSAGES[500])
    }
}

export const crearireccion = async (req,res)=>{
    try {
        const { calle, ciudad, provincia, pais, cod_postal, user_id } = req.body;

        if(!calle || !ciudad || !provincia || !pais || !cod_postal || !user_id ){
            return res.status(400).json(MESSAGES[400]);
        }

        if(typeof calle !== "string" || typeof ciudad !== "string" || typeof provincia !== "string" || typeof pais !== "string" || typeof cod_postal !== "number" || typeof user_id !== "number"){
            return res.status(400).json(MESSAGES[400])
        }

        const nuevaDireccion = await DireccionModel.create({
            calle,
            pais,
            ciudad,
            cod_postal,
            user_id,
            provincia
        })

        const usuarioExiste = await UserModel.findOne({ where: { id: user_id } });
        if (!usuarioExiste) return res.status(404).json({ message: "El usuario no existe." });

        return res.status(201).json(nuevaDireccion)
    } catch (error) {
        console.error(error);
        res.status(500).json(MESSAGES[500])
    }
}