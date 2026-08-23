import { Router } from "express";

import { crearUser, eliminarUser, obtenerUser, obtenerUsers, updateUser } from "../controllers/User.Controller.js";

import { validationsUser, validatorUpdatedUser, validatorUserById } from "../middlewares/validaciones/user-validations.js";

import { validate } from "../middlewares/validate.js";

export const UserRoutes = Router();

UserRoutes.post("/", validationsUser, validate , crearUser); // esto junta dos validadores y un contorller
UserRoutes.get("/", obtenerUsers);
UserRoutes.get("/:id",validatorUserById ,validate ,obtenerUser); //esto esta en singular >>> no confundir <<<
UserRoutes.put("/:id",validatorUpdatedUser, validate ,updateUser);
UserRoutes.delete("/:id",validatorUserById,validate, eliminarUser);