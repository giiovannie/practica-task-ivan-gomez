import { DireccionModel } from "../models/Direccion.js";
import { MESSAGES } from "./User.Controller.js";
import { UserModel } from "../models/User.js";
import { matchedData } from "express-validator";

export const getAllWays = async (req,res)=>{
    try {
        const direcciones  = await DireccionModel.findAll({
            attributes: {
                exclude: ["user_id", "createdAt", "updatedAt", "password"]
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
        const { id } = matchedData(req);

        const tarerDireccion = await DireccionModel.findOne(
            {
                where: {id},
                include: {
                    model: UserModel, as: "author"
                },
                attributes: {
                    exclude: ["user_id", "createdAt", "updatedAt", "password"]
                }
            }
        )

        return res.status(200).json(tarerDireccion);
    } catch (error) {
        console.error(error);
        res.status(500).json(MESSAGES[500])
    }
}

export const crearDireccion = async (req,res)=>{
    try {
        const data  = matchedData(req);
        const nuevaDireccion = await DireccionModel.create(data)
        return res.status(201).json(nuevaDireccion)
    } catch (error) {
        console.error(error);
        res.status(500).json(MESSAGES[500])
    }
}

export const deleteDireccion = async (req,res)=>{
    try {
        const { id } = matchedData(req);
        const direccion = await DireccionModel.findByPk(id)
        await direccion.destroy()
        return res.status(200).json({
            message: "se borro exitosamente la direccion ligada al usuario"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500]);
    }
};


export const updateDireccion = async (req,res)=>{
    try {
        const data = matchedData(req)
        const direccion = await DireccionModel.findByPk(data.id)
        await direccion.update(data)
        return res.status(200).json(direccion)
    } catch (error) {
        console.error(error);
        return res.status(500).json(MESSAGES[500])
    }
}