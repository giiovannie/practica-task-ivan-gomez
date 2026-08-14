import { Router } from "express";
import { getAllWays, getAlWaysId, crearireccion } from "../controllers/direccion.controller.js";

export const direccionRoutes = Router();

direccionRoutes.get("/", getAllWays);
direccionRoutes.get("/:id", getAlWaysId);
direccionRoutes.post("/", crearireccion);