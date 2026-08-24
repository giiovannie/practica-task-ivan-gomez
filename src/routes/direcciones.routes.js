import { Router } from "express";
import { getAllWays, getAlWaysId, crearDireccion, deleteDireccion, updateDireccion } from "../controllers/direccion.controller.js";
import { validate } from "../middlewares/validate.js";
import { validatorDireccionById, validatorInsertDireccion, validatorUpdateDireccion } from "../middlewares/validaciones/direcccion-validations.js";

export const direccionRoutes = Router();

direccionRoutes.get("/", getAllWays);
direccionRoutes.get("/:id",validatorDireccionById,validate, getAlWaysId);
direccionRoutes.post("/",validatorInsertDireccion,validate, crearDireccion);
direccionRoutes.put("/:id", validatorUpdateDireccion, validate, updateDireccion);
direccionRoutes.delete("/:id", validatorDireccionById, validate, deleteDireccion)