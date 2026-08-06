import { Router } from "express";
import { crearUser } from "../controllers/User.Controller.js";

export const UserRoutes = Router();

UserRoutes.post("/", crearUser)