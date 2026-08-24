import { Router } from "express";
import { asignarCategoriaATarea, mostrarRelaciones, quitarCategoriaDeTarea } from "../controllers/task_category.controller";

export const taskCategoryRouter = Router();

taskCategoryRouter.get("/", mostrarRelaciones);
taskCategoryRouter.post("/", asignarCategoriaATarea);
taskCategoryRouter.delete("/:id", quitarCategoriaDeTarea);
