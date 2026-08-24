import { Router } from "express";
import { asignarCategoriaATarea, mostrarRelaciones, quitarCategoriaDeTarea } from "../controllers/task_category.controller.js";
import { validate} from "../middlewares/validate.js"
import { validatorTaskCategory } from "../middlewares/validaciones/task_category-validations.js";

export const taskCategoryRouter = Router();

taskCategoryRouter.get("/", mostrarRelaciones);
taskCategoryRouter.post("/", validatorTaskCategory, validate, asignarCategoriaATarea);
taskCategoryRouter.delete("/", validatorTaskCategory, validate, quitarCategoriaDeTarea);
