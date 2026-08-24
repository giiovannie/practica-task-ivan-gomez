import { Router } from "express";
import { getAllCtegory, tarerCategoria, crearCategoria, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { validationGetCategoryById, validationUpdateCategory, validatorCategoryInsert } from "../middlewares/validaciones/category-validations.js";
import { validate } from "../middlewares/validate.js";

export const CategoryRouter = Router();

CategoryRouter.get("/", getAllCtegory);
CategoryRouter.get("/:id",validationGetCategoryById,validate, tarerCategoria);
CategoryRouter.post("/",validatorCategoryInsert,validate, crearCategoria);
CategoryRouter.put("/:id", validationUpdateCategory, validate, updateCategory )
CategoryRouter.delete("/:id", validationGetCategoryById, validate, deleteCategory)