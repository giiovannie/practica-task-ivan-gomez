import { Router } from "express";
import { getAllCtegory, tarerCategoria, crearCategoria } from "../controllers/category.controller.js";
import { validationGetCategoryById, validationUpdateCategory, validatorCategoryInsert } from "../middlewares/validaciones/category-validations.js";
import { validate } from "../middlewares/validate.js";

export const CategoryRouter = Router();

CategoryRouter.get("/",validatorCategoryInsert,validate, getAllCtegory);
CategoryRouter.get("/:id",validationGetCategoryById,validate, tarerCategoria);
CategoryRouter.post("/",validationUpdateCategory,validate, crearCategoria);