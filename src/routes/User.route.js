import { Router } from "express";
import { crearUser, eliminarUser, obtenerUser, obtenerUsers, updateUser } from "../controllers/User.Controller.js";

export const UserRoutes = Router();

UserRoutes.post("/", crearUser);
UserRoutes.get("/", obtenerUsers);
UserRoutes.get("/:id", obtenerUser); //esto esta en singular >>> no confundir <<<
UserRoutes.put("/:id", updateUser);
UserRoutes.delete("/:id", eliminarUser);