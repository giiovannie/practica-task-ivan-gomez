import { Router } from "express";
import { agreguaTarea, mostrarTarea, mostrarTareas } from "../controllers/Task.Controller.js";

export const TaskRouter = Router();

TaskRouter.post("/", agreguaTarea);
TaskRouter.get("/", mostrarTareas);
TaskRouter.get("/:id", mostrarTarea)