import { Router } from "express";
import { crearUser, obtenerUser, obtenerUsers, updateUser } from "../controllers/User.Controller.js";

export const UserRoutes = Router();

UserRoutes.post("/", crearUser);
UserRoutes.get("/", obtenerUsers);
UserRoutes.get("/:id", obtenerUser); //esto esta en singular no confundir
UserRoutes.put("/:id", updateUser)
