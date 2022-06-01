import { Router } from "express";
import { categoriesCreatedController, getCategoriesController } from "../Controllers/categoriesController.js";
import { validationCreatedCategories } from "../Middlewares/categoriesValidation.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategoriesController);
categoriesRouter.post("/categories", validationCreatedCategories, categoriesCreatedController);

export default categoriesRouter;