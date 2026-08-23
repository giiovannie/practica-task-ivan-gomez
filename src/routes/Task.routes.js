import { Router } from "express";

import { actualizarTarea, agreguaTarea, eliminarTarea, mostrarTarea, mostrarTareas } from "../controllers/task.Controller.js";

import { validationsTask, validationTaskById, ValidationUpdateTask } from "../middlewares/validaciones/task-validations.js";

import { validate } from "../middlewares/validate.js";


export const TaskRouter = Router();

TaskRouter.post("/",validationsTask,validate,agreguaTarea);
TaskRouter.get("/", mostrarTareas);
TaskRouter.get("/:id",validationTaskById,validate, mostrarTarea);
TaskRouter.put("/:id",ValidationUpdateTask,validate, actualizarTarea);
TaskRouter.delete("/:id",validationTaskById,validate,eliminarTarea);