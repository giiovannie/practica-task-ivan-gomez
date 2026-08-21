import { Router } from "express";
import { crearUser, eliminarUser, obtenerUser, obtenerUsers, updateUser } from "../controllers/user.Controller.js";
import { validationsUser } from "../middlewares/validaciones/user-validations.js";
import { validate } from "../middlewares/validate.js";
import { matchedData } from "express-validator";//importantye de que aca tambien se debe de importar
export const UserRoutes = Router();

UserRoutes.post("/", validationsUser, validate , crearUser); // esto junta dos validadores y un contorller
UserRoutes.get("/", obtenerUsers);
UserRoutes.get("/:id", obtenerUser); //esto esta en singular >>> no confundir <<<
UserRoutes.put("/:id", updateUser);
UserRoutes.delete("/:id", eliminarUser);