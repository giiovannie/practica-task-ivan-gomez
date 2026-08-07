import { Router } from "express";
import { actualizarTarea, agreguaTarea, eliminarTarea, mostrarTarea, mostrarTareas } from "../controllers/Task.Controller.js";

export const TaskRouter = Router();

TaskRouter.post("/", agreguaTarea);
TaskRouter.get("/", mostrarTareas);
TaskRouter.get("/:id", mostrarTarea);
TaskRouter.put("/:id", actualizarTarea);
TaskRouter.delete("/:id", eliminarTarea);