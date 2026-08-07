import { Router } from "express";
import { crearUser, obtenerUser, obtenerUsers } from "../controllers/User.Controller.js";

export const UserRoutes = Router();

UserRoutes.post("/", crearUser);
UserRoutes.get("/", obtenerUsers);
UserRoutes.get("/:id",obtenerUser);