import { Router } from "express";
import { getAllCtegory, tarerCategoria, crearCategoria } from "../controllers/Category.Controller.js";

export const CategoryRouter = Router();

CategoryRouter.get("/", getAllCtegory);
CategoryRouter.get("/:id", tarerCategoria);
CategoryRouter.post("/", crearCategoria);